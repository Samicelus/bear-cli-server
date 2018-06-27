const handler_loader = require('./handler_loader.js');
const redisPromise = require('../libs/redis-promise.js').redisClient;
const auth = require('./auth.js')(redisPromise);

class SocketHandler{
    constructor(io, redis){
        this._redis = redis;
        this._io = io;
        let loader_ret = new handler_loader(`./app_servers/${process.env.server_type}`);
        log(`[${process.env.server_id}] handlers:`, Object.keys(loader_ret.handlers));
        this._handler = loader_ret.handlers;
    }

    async handle_message(data, socket){
        let handler_name = data.handler_name;
        let method = data.method;
        let user_id = data.user_id;
        let token = data.token;
        let user = {};
        let ret = await auth.checkToken(user_id, token);
        if (!ret.result) {
            return {result:false, message:`token 校验失败，请重新登录`}
        }
        if(ret.user){
            user = ret.user;
        }
        user.user_id = user_id;
        await this.regist_login_socket(socket, user_id);
        data.request_user_info = user;
        let rst = await this.call_handler(handler_name, method, data, socket);
        rst.handler_name = "return";
        socket.send(rst);
        return {result: true};
    }

    async regist_login_socket(socket, user_id){
        log(`regist ${user_id} socket ${socket.id}`);
        let k = `${user_id}:${process.env.server_id}:socket_id`;
        await this._redis.setAsync(k, socket.id);
    }

    async call_handler(hanler_name, method, data, socket){
        return await this._handler[hanler_name][method](data, socket);
    }

    async send_message(user_id, data){
        let k = `${user_id}:${process.env.server_id}:socket_id`;
        let socket_id = await this._redis.getAsync(k);
        if(socket_id){
            return await this._io.to(socket_id).send(data);
        }
    }

    broadcast(room, data){
        this._io.to(room).send(data);
    }

}


module.exports = SocketHandler;