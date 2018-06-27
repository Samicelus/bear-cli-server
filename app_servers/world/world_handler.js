const path = require('path')
const dispatcher = require('../../libs/dispatcher.js');
const redis = require('../../libs/redis.js').redisClient;
const appServers = require(path.join(__dirname,'../../config/appServerConfig.json'))[process.env.NODE_ENV];
const BaseHandler = require(path.join(__dirname,'../../libs/baseSocketHandler.js'));
let handler = new BaseHandler();

handler.createWorld = async function(data, socket){
    let world_id = data.world_id;
    let user_ids = data.user_ids.split(',');
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


handler.reconnectAlive = function(data, socket){
    return {result:true, method:"reconnectAlive"};
};

module.exports = handler;