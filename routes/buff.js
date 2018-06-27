const path = require('path');
const utils = require('../libs/utils.js');
const handler = require(path.join(__dirname,'../services/buffService.js'));

module.exports = (router)=>{
    router.post('/addBuff', handler.addBuff);
    router.get('/getBuffs', handler.getBuffs);
};