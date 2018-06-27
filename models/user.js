const BaseModel = require('../libs/baseModel.js');
const utils = require('../libs/utils.js');
let model  = new BaseModel();

let _Schema = new model.Schema({
    nickname: {type: String},
    phone: {type: String},
    pwd: {type: String},
    created: {type: String},
    updated: {type: String}
},{versionKey: false});

_Schema.pre('save', function(next) {
    let nowTime = utils.datetimeFormat();
    if (this.isNew) {
        this.created = this.updated = nowTime;
    } else {
        this.updated = nowTime;
    }
    next();
});

model.schema =  model.mongoose.model('users', _Schema);

module.exports = model;