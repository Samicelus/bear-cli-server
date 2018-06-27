const path = require('path');
const appServers = require(path.join(__dirname,'../config/appServerConfig.json'))[process.env.NODE_ENV];
const chat_server = appServers.chat[0];
const io = require('socket.io-client');
const redisPromise = require('../libs/redis-promise.js').redisClient;
const auth = require('./auth.js')(redisPromise);

class rpc{
    constructor(){
        let that = this;
        this.user_id = "system";
        this.token;
        this.set_token();
        this.socket = this.connect(chat_server);
        this.socket.on('connect',()=>{
            console.log(`rpc socket connected`);
        });
        this.socket.on('disconnect',()=>{
            that.socket = that.connect(chat_server);
        });
    }

    connect(server){
        return io(`http://${server.host}`,{path:`/${server.port}/socket.io`});
    }

    async set_token(){
        let token_result = await auth.generateToken(this.user_id, appServers.host);
        this.token = token_result.token;
    }

    send(data){
        data.user_id = this.user_id;
        data.token = this.token;
        this.socket.send(data);
    }
}

module.exports = new rpc();
