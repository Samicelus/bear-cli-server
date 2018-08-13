var BaseModel = require('../libs/baseModel.js');
var model  = new BaseModel();

var _Schema = new model.Schema({
    doctor_oid: {type: model.Schema.Types.ObjectId, ref:"yunyi_doctors"},
    weixin_oid: {type: model.Schema.Types.ObjectId, ref:"weixins"},
    openid: {type: String}
}, {versionKey: false});

model.schema =  model.mongoose.model('weixin_events', _Schema);

module.exports = model;