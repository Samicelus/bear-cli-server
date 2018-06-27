const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const send = require('koa-send');
const utils = require('../libs/utils.js');

const Avatar = require(path.join(__dirname, '../models/avatar.js'));
const User = require(path.join(__dirname, '../models/user.js'));
const Card = require(path.join(__dirname, '../models/card.js'));
const UserCard = require(path.join(__dirname, '../models/user_card.js'));
const UserCardSet = require(path.join(__dirname, '../models/user_card_set.js'));
const Buff = require(path.join(__dirname, '../models/buff.js'));
const World = require(path.join(__dirname, '../models/world.js'));

const WorldDomain = require('../domain/world/world.js');

const BaseHandler = require(path.join(__dirname, '../libs/baseHandler.js'));
let handlers = new BaseHandler();

global.worlds = {};

let next_level_require = {
    "1":10,
    "2":30,
    "3":80
};



handlers.addUserCard = async function(ctx, next){
    let body = ctx.request.body;
    let user_id = body.user_id;
    let card_id = body.card_id;
    let card_obj = await Card.schema.findById(card_id).exec();
    let user_card_obj = await UserCard.schema({
        user_oid: mongoose.Types.ObjectId(user_id),
        card_oid: mongoose.Types.ObjectId(card_id),
        fragments: 0,
        next_level_require: next_level_require[card_obj.level]
    }).save();
    handlers.restSuccess(ctx, user_card_obj);
};

handlers.editUserCardSet = async function(ctx, next){
    let body = ctx.request.body;
    let user_id = body.user_id;
    let card_ids = JSON.parse(body.card_ids);
    let user_card_set_obj = await UserCardSet.schema.findOne({
        user_oid:mongoose.Types.ObjectId(user_id)
    }).exec();
    let card_oids = [];
    card_ids.forEach((card_id)=>{
        card_oids.push(mongoose.Types.ObjectId(card_id))
    })
    if(user_card_set_obj){
        user_card_set_obj.card_oids = card_oids;
        user_card_set_obj.markModified('user_card_ids');
        await user_card_set_obj.save();
    }else{
        user_card_set_obj = await UserCardSet.schema({
            user_oid:mongoose.Types.ObjectId(user_id),
            card_oids:card_oids
        }).save();
    }
    handlers.restSuccess(ctx, user_card_set_obj);
};

handlers.createWorld = async function(ctx, next){
    let body = ctx.request.body;
    let world_id = body.world_id;
    let user_ids = body.user_ids.split(',');
    let user_configs = [];
    let world_obj = await World.schema.findById(world_id).lean().exec();
    if(world_obj.player_num != user_ids.length){
        console.log(world_obj.player_num);
        console.log(user_ids.length);
        throw new Error(`player num not correct`);
    }
    await (async ()=>{
        for(let user_id of user_ids){
            let user_obj = await User.schema.findById(user_id).lean().exec();
            let user_card_set_obj = await UserCardSet.schema.findOne({
                user_oid:mongoose.Types.ObjectId(user_id)
            }).lean().exec();
            let user_cards_obj_arr = await UserCard.schema.find({
                card_oid:{"$in":user_card_set_obj.card_oids}
            }).populate({
                path:`card_oid`,
                populate:{path:`summon`}
            }).lean().exec();
            let user_cards_list = [];
            user_cards_obj_arr.forEach((user_card_obj)=>{
                user_cards_list.push(user_card_obj.card_oid);
            })
            user_configs.push({
                id: user_id,
                name: user_obj.nickname,
                cards: user_cards_list
            });
        }
    })();
    world_obj.id = utils.generateId(world_obj.name);
    world_obj.side_info = user_configs;
    let user_id_map = {};
    for(let player_id = 1; player_id <= world_obj.player_num; player_id++){
        user_id_map[`user_${player_id}`] = user_ids.pop();
    }
    world_obj.region_info.forEach((region)=>{
        if(region.default_occupied){
            region.default_occupied = user_id_map[region.default_occupied]
        }
        for(let position_id in region.positions){
            region.positions[position_id].side_id = user_id_map[region.positions[position_id].side_id];
        }
    });
    console.log(world_obj);
    let new_world = new WorldDomain(world_obj);
    worlds[world_obj.id] = new_world;
    handlers.restSuccess(ctx, new_world.report_world());
};

handlers.viewWorld = async function(ctx, next){
    let query = ctx.query;
    let world_id = query.world_id;
    let world = worlds[world_id];
    if(!world){
        throw new Error(`world not found or already ended`);
    }
    handlers.restSuccess(ctx, world.report_world());
}

handlers.useCard = async function(ctx, next){
    let body = ctx.request.body;
    let user_id = body.user_id;
    let card_id = body.card_id;
    let region_id = body.region_id;
    let position_id = body.position_id;
    let world_id = body.world_id;
    let world = worlds[world_id];
    if(!world){
        throw new Error(`world not found or already ended`);
    }
    world.use_card(user_id, card_id, {
        region_id: region_id,
        position_id: position_id
    });
    handlers.restSuccess(ctx, world.report_world());
}

handlers.setFlags = async function(ctx, next){
    let body = ctx.request.body;
    let user_id = body.user_id;
    let world_id = body.world_id;
    let region_ids = body.region_ids.split(',');
    let world = worlds[world_id];
    if(!world){
        throw new Error(`world not found or already ended`);
    }
    world.set_flags(user_id, region_ids);
    handlers.restSuccess(ctx, world.report_world());
}

handlers.endTurn = async function(ctx, next){
    let body = ctx.request.body;
    let user_id = body.user_id;
    let world_id = body.world_id;
    let world = worlds[world_id];
    if(!world){
        throw new Error(`world not found or already ended`);
    }
    await world.end_turn(user_id);
    handlers.restSuccess(ctx, world.report_world());
}


module.exports = handlers;