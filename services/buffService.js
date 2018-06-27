const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const send = require('koa-send');

const utils = require('../libs/utils.js');

const Buff = require(path.join(__dirname, '../models/buff.js'));
const Effect = require(path.join(__dirname, '../models/effect.js'));

const BaseHandler = require(path.join(__dirname, '../libs/baseHandler.js'));
let handlers = new BaseHandler();

handlers.addBuff = async function(ctx, next){
    let body = ctx.request.body;
    let name = body.name;
    let key = body.key;
    let description = body.description;
    let effect_ids = body.effect_ids;
    let lasts = body.lasts;
    let effects;
    if(!name){
        throw new Error(`no name specified!`)
    }
    if(!description){
        throw new Error(`no description specified!`)
    }

    try{
        effect_ids = JSON.parse(effect_ids);
        let effect_oids = [];
        effect_ids.forEach((effect_id)=>{
            effect_oids.push(mongoose.Types.ObjectId(effect_id))
        });
        let condition = {_id:{"$in":effect_oids}};
        effects = await Effect.schema.find(condition).lean().exec();
    }catch(e){
        throw new Error(`effect_ids not parsable`);
    }

    try{
        lasts = Number(lasts);
    }catch(e){
        throw new Error(`lasts not numeric`);
    }

    let buff_obj = await Buff.schema({
        name:name,
        key:key,
        description:description,
        effects:effects,
        lasts:lasts
    }).save();

    handlers.restSuccess(ctx, buff_obj);
};

handlers.getBuffs = async function(ctx, next){
    let list = await Buff.schema.find({}).exec();
    handlers.restSuccess(ctx, list);
};


module.exports = handlers;