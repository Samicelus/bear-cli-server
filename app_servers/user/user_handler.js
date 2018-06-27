const path = require('path')
const dispatcher = require('../../libs/dispatcher.js');
const redis = require('../../libs/redis.js').redisClient;
const appServers = require(path.join(__dirname,'../../config/appServerConfig.json'))[process.env.NODE_ENV];
const BaseHandler = require(path.join(__dirname,'../../libs/baseSocketHandler.js'));
let handler = new BaseHandler();

handler.login = function(data, socket){
    let request_user_info = data.request_user_info;
    log(`login data:`,data);
    let user_id = data.user_id;
    let route_map = {};
    for(let server_type in appServers){
        let server_list = appServers[server_type];
        let dispatch_str = `${user_id}${new Date().getTime()}`;
        route_map[server_type] = dispatcher.dispatch(dispatch_str, server_list);
    }
    return {result:true, data:{login:user_id, route_map:route_map}};
};


handler.reconnectAlive = function(data, socket){
    return {result:true, method:"reconnectAlive"};
};

module.exports = handler;