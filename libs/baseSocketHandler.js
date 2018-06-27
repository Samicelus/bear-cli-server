const path = require('path');
const utils = require('./utils.js');
const redisPromise = require('./redis-promise.js').redisClient;

class BaseHandler{
    constructor(){
    }

    async send_message(user_id, handler_name, data){
        data.handler_name = handler_name;
        await global.socket_handler.send_message(user_id, data);
    }
}



module.exports = BaseHandler;