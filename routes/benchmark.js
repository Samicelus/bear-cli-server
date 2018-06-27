const path = require('path');
const utils = require('../libs/utils.js');
const handler = require(path.join(__dirname,'../services/benchmarkService.js'));

module.exports = (router)=>{
    router.post('/addUserCard', handler.addUserCard);
    router.post('/editUserCardSet', handler.editUserCardSet);
    router.post('/createWorld', handler.createWorld);
    router.get('/viewWorld', handler.viewWorld);
    router.post('/useCard', handler.useCard);
    router.post('/setFlags', handler.setFlags);
    router.post('/endTurn', handler.endTurn);
};