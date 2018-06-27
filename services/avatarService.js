const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const send = require('koa-send');

const utils = require('../libs/utils.js');

const Avatar = require(path.join(__dirname, '../models/avatar.js'));
const Card = require(path.join(__dirname, '../models/card.js'));
const Buff = require(path.join(__dirname, '../models/buff.js'));

const BaseHandler = require(path.join(__dirname, '../libs/baseHandler.js'));
let handlers = new BaseHandler();

handlers.addAvatarSerial = async function(ctx, next){
    let body = ctx.request.body;
    let configs = JSON.parse(body.configs);
    let avatar_name = body.avatar_name;
    let history = body.history;
    if(!avatar_name){
        throw new Error(`no avatar_name specified!`)
    }
    if(!history){
        throw new Error(`no history specified!`)
    }
    let new_avatars = [];
    configs.forEach(async (config)=>{
        let temp_avatar = {
            name: `${config.level}级 ${avatar_name}`,
            type: "summon",
            level: config.level,
            baseHp: config.baseHp,
            attack: config.attack,
            history: history,
            costs: config.costs
        };
        if(config.buff_ids && config.buff_ids.length > 0){
            try{
                let buff_oids = [];
                config.buff_ids.forEach((buff_id)=>{
                    buff_oids.push(mongoose.Types.ObjectId(buff_id))
                });
                let condition = {_id:{"$in":buff_oids}};
                temp_avatar.defaultBuffs = await Buff.schema.find(condition).lean().exec();
            }catch(e){
                throw new Error(`defaultBuffs not parsable`);
            }
        }
        new_avatars.push(temp_avatar);
    });
    await new_avatars.forEach(async (new_avatar)=>{
        let avatar_obj = await Avatar.schema(new_avatar).save();
        let summon = avatar_obj._id;
        let temp_card = new_avatar;
        temp_card.summon = summon;
        let card_obj = await Card.schema(temp_card).save();
    });
    handlers.restSuccess(ctx, "ok");
};

handlers.listAvatar = async function(ctx, next){
    let list = await Avatar.schema.find({}).exec();
    handlers.restSuccess(ctx, list);
};


module.exports = handlers;