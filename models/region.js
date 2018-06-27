const BaseModel = require('../libs/baseModel.js');
const utils = require('../libs/utils.js');
let model  = new BaseModel();

let _Schema = new model.Schema({
    name: {type: String},
    position_num:{type: Number},
    type: {type: String, enum:["base", "normal"], default:"normal"},
    benefit: {
        coin: Number,
        fire_crystal: Number,
        water_jade: Number,
        living_wood: Number,
        shadow_iron: Number,
        holy_stone: Number,
        scene_resource: Number
    },           //占领利益
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

model.schema =  model.mongoose.model('regions', _Schema);

module.exports = model;


