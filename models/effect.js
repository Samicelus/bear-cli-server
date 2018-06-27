const BaseModel = require('../libs/baseModel.js');
const utils = require('../libs/utils.js');
let model  = new BaseModel();

let _Schema = new model.Schema({
    name:{type:String},
    type:{type:String, enum:["buff", "state"]},              //"<效果类型>"        "buff"-数值改变,    "state"-状态改变
    detail:{type:Object},            //buff细节        {"attack":number, "hp_max":number}
    state:{type: Object},            //state细节        {"poison":number, "silent":boolean}
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

model.schema =  model.mongoose.model('effects', _Schema);

module.exports = model;



// {
//     type:
//     detail: {
//         "attack": <number>,
//             "hp_max": <number>
//     },
//     state:{
//         "poison": <number>,     每回合 hp 减去 number
//         "silent": <boolean>,        无法施法
//         "immobilize": <boolean>,    无法移动
//         "weak": <boolean>,          无法攻击
//         "stunned": <boolean>,       无法行动
//         "speed": <boolean>,         不受反击
//         "twice": <boolean>,         双击
//         "void_body": <boolean>      不受物理攻击
//     }
// }