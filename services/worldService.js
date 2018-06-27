const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const send = require('koa-send');

const utils = require('../libs/utils.js');

const World = require(path.join(__dirname, '../models/world.js'));
const Region = require(path.join(__dirname, '../models/region.js'));

const BaseHandler = require(path.join(__dirname, '../libs/baseHandler.js'));
let handlers = new BaseHandler();

handlers.addRegion = async function(ctx, next){
    let body = ctx.request.body;
    let name = body.name;
    let position_num = body.position_num;
    let type = body.type;
    let coin = body.coin?Number(body.coin):"";
    let fire_crystal = body.fire_crystal?Number(body.fire_crystal):"";
    let water_jade = body.water_jade?Number(body.water_jade):"";
    let living_wood = body.living_wood?Number(body.living_wood):"";
    let shadow_iron = body.shadow_iron?Number(body.shadow_iron):"";
    let holy_stone = body.holy_stone?Number(body.holy_stone):"";
    let scene_resource = body.scene_resource?Number(body.scene_resource):"";

    let region_obj = await Region.schema({
        name: name,
        type: type,
        position_num: position_num,
        benefit: {
            coin: coin,
            fire_crystal: fire_crystal,
            water_jade: water_jade,
            living_wood: living_wood,
            shadow_iron: shadow_iron,
            holy_stone: holy_stone,
            scene_resource: scene_resource
        }
    }).save();

    handlers.restSuccess(ctx, region_obj);
};

handlers.listRegion = async function(ctx, next){
    let list = await Region.schema.find({}).lean().exec();
    handlers.restSuccess(ctx, list);
};


handlers.addWorld = async function(ctx, next){
    let body = ctx.request.body;
    let name = body.name;
    let description = body.description;
    let scene_resource_name = body.scene_resource_name;
    let victory_conditions = body.victory_conditions?JSON.parse(body.victory_conditions):[{type:"conquer"}];
    let player_num = body.player_num?Number(body.player_num):2;
    let player_replacement = [];
    for(let player_id = 1;player_id <= player_num; player_id++){
        player_replacement.push(`user_${player_id}`);
    }
    let region_path = body.region_path?JSON.parse(body.region_path):{};
    let region_info = [];
    let region_ids = [];
    let path_region_ids = [];
    //{<region_id>:{<region_id>:true, <region_id2>:true}}
    for(let region_id in region_path){
        region_ids.push(region_id);
        let region_obj = await Region.schema.findById(region_id).lean().exec();
        if(!region_obj){
            throw new Error(`region: ${region_id} do not exists!`);
        }
        let path = region_path[region_id];
        let path_num = 0;
        for(let path_region_id in path){
            path_region_ids.push(path_region_id);
            path_num += 1;
        }
        if(path_num == 0){
            throw new Error(`${region_id} has no path`)
        }
        let type = region_obj.type;
        let name = region_obj.name;
        let benefit = region_obj.benefit;

        //replace with scene_resource_name
        benefit[scene_resource_name] = benefit.scene_resource;
        delete benefit.scene_resource;
        
        let position_num = region_obj.position_num;
        let positions = {};
        let default_occupied = null;
        switch(type){
            case "normal":
                for(let position_id = 1; position_id <= player_num*position_num; position_id++){
                    let player_id = Math.ceil(position_id / position_num);
                    positions[position_id] = {
                        occupied:null,
                        side_id: `user_${player_id}`
                    };
                }
                break;
            case "base":
                let side_id = player_replacement.pop();
                for(let position_id = 1; position_id <= position_num; position_id++){
                    default_occupied = side_id;
                    if(!side_id){
                        throw new Error(`base num & player_num not match`)
                    }
                    positions[position_id] = {
                        occupied:null,
                        side_id: side_id
                    };
                };
                break;
            default:
                break;
        }
        region_info.push({
            id: region_id,
            name: name,
            path: path,
            positions: positions,
            type: type,
            benefit: benefit,
            default_occupied: default_occupied
        })
    }
    //check all path has destination
    if(!path_region_ids.every((path_region_id)=>{
        return region_ids.includes(path_region_id);
    })){
        throw new Error(`path_region_id leads to un specified region`)
    }
    //chech user who has no base set
    if(player_replacement.length > 0){
        throw new Error(`${player_replacement[0]} has no base settled`);
    }
    let temp_world = {
        name: name,
        player_num: player_num,
        scene_resource_name: scene_resource_name,
        victory_conditions: victory_conditions,
        region_info: region_info,
        description: description
    }
    let world_obj = await World.schema(temp_world).save();
    handlers.restSuccess(ctx, world_obj);
};

handlers.listWorld = async function(ctx, next){
    let list = await World.schema.find({}).lean().exec();
    handlers.restSuccess(ctx, list);
};

module.exports = handlers;