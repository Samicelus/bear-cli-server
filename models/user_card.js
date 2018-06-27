const BaseModel = require('../libs/baseModel.js');
const utils = require('../libs/utils.js');
let model  = new BaseModel();

let _Schema = new model.Schema({
    user_oid: {type: Object, ref:"users"},
    card_oid: {type: Object, ref:"cards"},
    fragments:{type: Number},
    next_level_require: {type: Number},
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

model.schema =  model.mongoose.model('user_cards', _Schema);

module.exports = model;
