const path = require('path');
const utils = require('../libs/utils.js');
const handler = require(path.join(__dirname,'../services/avatarService.js'));

module.exports = (router)=>{
    router.post('/addAvatarSerial', handler.addAvatarSerial);
    router.get('/listAvatar', handler.listAvatar);
};