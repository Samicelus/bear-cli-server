const path = require('path');
const utils = require('../libs/utils.js');
const handler = require(path.join(__dirname,'../services/userService.js'));

module.exports = (router)=>{
    router.post('/sendCheckPhone', handler.sendCheckPhone);
    router.post('/bindPhone', handler.bindPhone);
    router.post('/login', handler.login);
    router.post('/editUserInfo',utils.authToken, handler.editUserInfo);
};