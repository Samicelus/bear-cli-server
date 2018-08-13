var BaseModel = require('../libs/baseModel.js');
var model  = new BaseModel();

var _Schema = new model.Schema({
    corp_name: {type: String},
    corpId:  {type: String},                 //微信公众号appid
    secret: {type: String},
    token: {type: String},
    mchId: {type: String},                   //微信商户id
    partnerKey: {type: String},
    weixin_num: {type: String},             //微信公众号原始id
    encodingAESKey: {type: String}
}, {versionKey: false});

model.schema =  model.mongoose.model('weixins', _Schema);

module.exports = model;