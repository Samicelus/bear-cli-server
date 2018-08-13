const path = require('path');
const util = require('util');
const cluster = require('cluster');
const appServerConfig = require(path.join(process.cwd(),'/config/appServerConfig.json'))[process.env.NODE_ENV];
const redisPromise = require('./libs/redis-promise.js').redisClient;
const masterAuth = require('./libs/auth.js')(redisPromise);
const SocketHandler = require(path.join(process.cwd(),'/libs/socket.io_handler.js'));

global.workers = {};
global.log = function(){
    process.stdout.write(`\x1B[42m[${process.env.server_id}]\x1B[49m `);
    for(let i in arguments){
        switch(typeof arguments[i]){
            case "number":
                process.stdout.write(`\x1B[36m${arguments[i].toString()}\x1b[0m`);
                process.stdout.write(" ");
                break;
            case "object":
                process.stdout.write(`\x1B[33m${JSON.stringify(util.inspect(arguments[i]))}\x1b[0m`);
                process.stdout.write(" ");
                break;
            case "function":
                process.stdout.write(`\x1B[90m${arguments[i].toString()}\x1B[39m`);
                process.stdout.write(" ");
                break;
            default:
                process.stdout.write(`\x1B[37m${arguments[i]}\x1B[39m`);
                process.stdout.write(" ");
                break;
        }
    }
    process.stdout.write("\n");
}

if(cluster.isMaster){
    log(`start master...`);
    for(let server_type in appServerConfig){
        appServerConfig[server_type].forEach((server_config)=>{
            server_config.server_type = server_type;
            server_config.server_id = server_config.id;
            global.workers[server_config.id] = cluster.fork(server_config);
        })
    }
    cluster.on('listening', function (worker, address) {
        log('listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
    });
}else if(cluster.isWorker) {
    let port = process.env.port;
    let io = require('socket.io')(port);
    log(`start worker ${process.env.id}...socket port:${port}`);
    global.socket_handler = new SocketHandler(io, redisPromise);
    io.on('connect',(socket)=>{
        log(`client with id [${socket.id}] connects to server`);
        socket.emit("reconnection_login",{});
        socket.on('message',async (data)=>{
            log(`receive message from ${socket.id}:`,data);
            let decrypt_data = masterAuth.decryptMessage(data.data, data.user_id);
            let rst = await global.socket_handler.handle_message(decrypt_data, socket);

            if(rst.result){
                log(`request from ${socket.id} done ${new Date().getTime()}`)
            }else{
                rst.handler_name = "error";
                let encrypt_data = masterAuth.encryptMessage(JSON.stringify(rst), `system:${process.env.server_id||'http'}`);
                socket.send({
                    user_id: `system:${process.env.server_id||'http'}`,
                    data: encrypt_data
                });
            }
        })
    });
    module.exports = io;
}