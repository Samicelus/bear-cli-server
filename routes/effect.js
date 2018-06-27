const path = require('path');
const utils = require('../libs/utils.js');
const handler = require(path.join(__dirname,'../services/effectService.js'));

module.exports = (router)=>{
    router.post('/addEffect', handler.addEffect);
    router.get('/getEffects', handler.getEffects);
};