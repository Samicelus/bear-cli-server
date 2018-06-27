const path = require('path');
const mongoose = require('mongoose');
const utils = require('../../libs/utils.js');
const dispatcher = require('../../libs/dispatcher.js');
const redisPromise = require('../../libs/redis-promise.js').redisClient;

const BaseHandler = require(path.join(__dirname,'../../libs/baseSocketHandler.js'));
let handler = new BaseHandler();

handler.sendChat = async function(data, socket){

};

handler.reconnectAlive = function(data, socket){
    return {result:true, method:"reconnectAlive"};
};

module.exports = handler;