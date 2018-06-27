const BaseModel = require('../libs/baseModel.js');
const utils = require('../libs/utils.js');
let model  = new BaseModel();

let _Schema = new model.Schema({
    name: {type: String},
    level: {type: Number},
    baseHp: {type: Number},
    attack: {type: Number},
    series: {type: String, enum:["fire", "water", "air", "terre", "none"]},
    defaultBuffs: [{
        name:{type:String},
        key:{type:String},
        effect:{type:Array},
        description:{type: String},
        lasts:{type: Number}
    }],
    history:{type: String},
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

model.schema =  model.mongoose.model('avatars', _Schema);

module.exports = model;
