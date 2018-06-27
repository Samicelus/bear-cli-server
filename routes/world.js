const path = require('path');
const utils = require('../libs/utils.js');
const handler = require(path.join(__dirname,'../services/worldService.js'));

module.exports = (router)=>{
    router.post('/addRegion', handler.addRegion);
    router.get('/listRegion', handler.listRegion);
    router.post('/addWorld', handler.addWorld);
    router.get('/listWorld', handler.listWorld);
};