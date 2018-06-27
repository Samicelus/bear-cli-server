const EventEmitter = require("events");

class Buff extends EventEmitter{
    constructor(properties){
        super();
        this.id = properties.id;
        this.name = properties.name;
        this.key = properties.key;
        this.effects = properties.effects;
        this.description = properties.description;
        this.lasts = properties.lasts;
    }

    get_id(){
        return this.id;
    }

    dim_lasts(){
        if(this.lasts != -1){
            this.lasts -= 1;
            if(this.lasts <= 0){
                this.lasts = 0;
            }
        }
    }

}

/*
effects: [{
    type:"<效果类型>"        "buff"-数值改变,    "state"-状态改变
    detail: {
        "attack": <number>,
        "hp_max": <number>
    },
    state:{
        "poison": <number>,     每回合 hp 减去 number
        "silent": <boolean>,        无法施法
        "immobilize": <boolean>,    无法移动
        "weak": <boolean>,          无法攻击
        "stunned": <boolean>,       无法行动
        "speed": <boolean>,         不受反击
        "twice": <boolean>,         双击
        "void_body": <boolean>      不受物理攻击
    }
 }]
*/

module.exports = Buff;