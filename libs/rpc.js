const path = require('path');
const appServers = require(path.join(__dirname,'../config/appServerConfig.json'))[process.env.NODE_ENV];
const chat_server = appServers.chat[0];
const io = require('socket.io-client');
const redisPromise = require('../libs/redis-promise.js').redisClient;
//const auth = require('./auth.js')(redisPromise);
const utils = require('./utils');


class rpc{
    constructor(){
        let that = this;
        this.user_id = `system:${process.env.server_id||'http'}`;
        this.send = this.send.bind(this);
        if(auth){
            auth.setRpc(this);
        }
        this.token;
        //TODO...这里会有一个bug，在socket服务器不共用一个redis缓存的时候，token校验会失败造成远程调用失败
        this.set_token();
        this.sockets = {};
        this.try_connect();
        this.rpc_queue = {};
        //timer for rpc_queue: call each request in case failled...
        this.queue = setInterval(async()=>{
            for(let request_id in that.rpc_queue){
                try{
                    await that.resend(that.rpc_queue[request_id], request_id);
                }catch(e){
                    console.error(e);
                }
            }
        },1000);
    }

    try_connect(){
        let that = this;
        for(let server_type in appServers){
            let server_list = appServers[server_type];
            this.sockets[server_type] = {};
            server_list.forEach((server)=>{
                if(process.env.server_id != server.id){
                    that.sockets[server_type][server.id] = that.connect(server);
                    that.sockets[server_type][server.id].on('connect',()=>{
                        console.log(`system:${process.env.server_id||'http'}: [连接成功] ${server.id} socket connected`);
                        that.sockets[server_type][server.id].server_online = true;
                    });
                    that.sockets[server_type][server.id].on('reconnect',()=>{
                        console.log(`system:${process.env.server_id||'http'}: [重连成功] ${server.id}`);
                        that.sockets[server_type][server.id].server_online = true;
                    });
                    that.sockets[server_type][server.id].on('error',()=>{
                        console.log(`system:${process.env.server_id||'http'}: [连接错误] ${server.id}`);
                        that.sockets[server_type][server.id].server_online = false;
                    });
                    that.sockets[server_type][server.id].on('connect_error',()=>{
                        console.log(`system:${process.env.server_id||'http'}: [连接失败] ${server.id}`);
                        that.sockets[server_type][server.id].server_online = false;
                    });
                    that.sockets[server_type][server.id].on('disconnect',()=>{
                        that.sockets[server_type][server.id] = that.connect(server);
                        that.sockets[server_type][server.id].server_online = false;
                    });
                }
            })
        }
    }

    check_remote_connection(server_type, server_id){
        if(this.sockets[server_type] && this.sockets[server_type][server_id]){
            return this.sockets[server_type][server_id].server_online;
        }else{
            return false;
        }
    }

    connect(server){
        return io(`http://${server.host}`,{path:`/${server.port}/socket.io`});
    }

    async set_token(){
        let token_result = await auth.generateToken(this.user_id, appServers.host);
        this.token = token_result.token;
    }

    async send(data, server_type, server_id){
        data.user_id = this.user_id;
        data.token = this.token;
        if(this.sockets[server_type] && this.sockets[server_type][server_id]){
            let encrypt_data = auth.encryptMessage(JSON.stringify(data), data.user_id);
            return await this.sockets[server_type][server_id].send({
                user_id: data.user_id,
                data: encrypt_data
            });
        }else{
            //TODO... target socket not connected, rpc.send fail, wait for connection...
            console.log(`[rpc message to ${data.handler_name}] target socket not connected, resend 1s later...`);

            let request_id = utils.generateId(server_id);
            this.rpc_queue[request_id] = {
                data: data,
                server_type: server_type,
                server_id: server_id,
                request_times: 0
            };
            console.log(`append request ${request_id}...`)
            return false;
        }
    }

    async resend(request_obj, request_id){
        let server_type = request_obj.server_type;
        let server_id = request_obj.server_id;
        if(this.sockets[server_type] && this.sockets[server_type][server_id]){
            let encrypt_data = auth.encryptMessage(JSON.stringify(request_obj.data), request_obj.data.user_id);
            await this.sockets[server_type][server_id].send({
                user_id: request_obj.data.user_id,
                data: encrypt_data
            });
            console.log(`request: ${request_id} sent`);
            delete this.rpc_queue[request_id];
        }else{
            this.rpc_queue[request_id].request_times += 1;
            console.log(`request ${this.rpc_queue[request_id].request_times}: ${request_id} not sent, append...`);
            if(this.rpc_queue[request_id].request_times > 10){
                console.log(`request_obj:`,request_obj);
                console.log(`current connected rpc socket:`);
                for(let server_type in this.sockets){
                    for(let server_id in this.sockets[server_type]){
                        console.log(server_id);
                    }
                }
                console.log(`request fail over 10s, deleted...`);
                delete this.rpc_queue[request_id];
            }
        }
    }

}

module.exports = new rpc();
