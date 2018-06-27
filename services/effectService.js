const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const send = require('koa-send');

const utils = require('../libs/utils.js');

const Effect = require(path.join(__dirname, '../models/effect.js'));

const BaseHandler = require(path.join(__dirname, '../libs/baseHandler.js'));
let handlers = new BaseHandler();

handlers.addEffect = async function(ctx, next){
    let body = ctx.request.body;
    let name = body.name;
    let type = body.type;
    let detail = body.detail;
    let state = body.state;

    if(!name){
        throw new Error(`no name specified!`)
    }
    if(!type){
        throw new Error(`no type specified!`)
    }
    if(type == "buff"){
        try{
            detail = JSON.parse(detail);
        }catch(e){
            throw new Error(`detail not parsable!`);
        }
    }else if(type == "state"){
        try{
            state = JSON.parse(state);
        }catch(e){
            throw new Error(`state not parsable!`);
        }
    }else{
        throw new Error(`invalid type!`);
    }

    let effect_obj = await Effect.schema({
        name:name,
        type:type,
        detail:detail,
        state:state
    }).save();

    handlers.restSuccess(ctx, effect_obj);
};

handlers.getEffects = async function(ctx, next){
    let list = await Effect.schema.find({}).exec();
    handlers.restSuccess(ctx, list);
};

module.exports = handlers;