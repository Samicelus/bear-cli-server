const BaseModel = require('../libs/baseModel.js');
const utils = require('../libs/utils.js');
let model  = new BaseModel();

let _Schema = new model.Schema({
    name:{type:String},
    scene_resource_name: {type: String},
    player_num: {type: Number},
    victory_conditions:[{
        type: {type: String},
        victory_num: {type: Number}
    }],
    region_info:[{
        id: {type: String},
        name: {type: String},
        path: {type: Object},
        positions:{type: Object},
        type: {type: String, enum:["normal","base"], default:"normal"},
        benefit: {type: Object},            //占领利益
        default_occupied: {type: Object},
    }],
    description:{type:String},
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

model.schema =  model.mongoose.model('worlds', _Schema);

module.exports = model;


