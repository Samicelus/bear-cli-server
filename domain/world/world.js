const EventEmitter = require("events");
const Avatar = require('../entity/avatar.js');
const Card = require('../card/card.js');
const UserResource = require('../world/userResource.js');
const Logic = require('../world/logic.js');
const utils = require('../../libs/utils.js');

class World extends EventEmitter{
    constructor(properties){
        super();
        this.id = properties.id;
        this.logic = new Logic(this, properties);
        this.entities = {};
        this.regions = {};
        this.init_regions(properties);
        this.sides = {};
        this.init_sides(properties);
        this.logic.begin_turn();
    }

    report_world() {
        //resource
        let resource = {};
        for (let side_id in this.sides) {
            let side = this.sides[side_id];
            let user_resource = side.user_resource;
            let name = side.name;
            resource[side_id] = {
                name: name,
                coin: user_resource.get_resource("coin"),
                fire_crystal: user_resource.get_resource("fire_crystal"),
                water_jade: user_resource.get_resource("water_jade"),
                living_wood: user_resource.get_resource("living_wood"),
                shadow_iron: user_resource.get_resource("shadow_iron"),
                holy_stone: user_resource.get_resource("holy_stone")
            };
            let scene_resource_name = user_resource.scene_resource_name;
            resource[side_id][scene_resource_name] = user_resource.get_resource(scene_resource_name)
        }
        //side
        let side_json = {};
        for(let side_id in this.sides){
            side_json[side_id] = {};
            side_json[side_id].id = side_id;
            side_json[side_id].name = this.sides[side_id].name;
            side_json[side_id].cards = [];
            for(let card_id in this.sides[side_id].cards){
                let card_obj = this.sides[side_id].cards[card_id];
                side_json[side_id].cards.push(card_obj.to_JSON());
            }
        }
        //region
        let region_json = {};
        for(let region_id in this.regions){
            region_json[region_id] = {};
            region_json[region_id].id = region_id;
            region_json[region_id].name = this.regions[region_id].name;
            region_json[region_id].path =this.regions[region_id].path;
            region_json[region_id].flags =this.regions[region_id].flags;
            region_json[region_id].positions = {};
            for(let position_id in this.regions[region_id].positions){
                let position_obj = this.regions[region_id].positions[position_id];
                region_json[region_id].positions[position_id] = {};
                if(position_obj.occupied){
                    region_json[region_id].positions[position_id].occupied = position_obj.occupied.toString();
                }
                region_json[region_id].positions[position_id].side_id = position_obj.side_id;
            }
        }
        return {id:this.id, resource:resource, side:side_json, region:region_json, turn:this.logic.turn_side};
    }

    init_regions(properties){
        let region_info = properties.region_info;
        region_info.forEach((region)=>{
            this.regions[region.id] = {
                id: region.id,
                name: region.name,
                path: region.path,                  //{<region_id>:true}
                positions: region.positions,        //{<position_id>:{"occupied":<entity_id>,"side_id":<side_id>}}
                benefit: region.benefit,
                occupied: region.default_occupied||null,
                flags:{},
                type:region.type||"normal"
            };
        })
    }

    init_sides(properties){
        let that = this;
        let side_info = properties.side_info;
        side_info.forEach((side)=>{
            let cards_object = {};
            side.cards.forEach((card)=>{
                card.id = utils.generateId(card.name);
                card = new Card(that, card);
                cards_object[card.id] = card;
            });
            that.sides[side.id] = {
                id: side.id,
                name: side.name,
                cards: cards_object,
                user_resource: new UserResource(that,{
                    side_id: side.id,
                    scene_resource_name: properties.scene_resource_name
                })
            }

        })
    }

    use_card(side_id, card_id, target){
        if(!this.logic.check_turn(side_id)){
            throw new Error(`not your turn`);
        }
        let card;
        if(this.sides[side_id] && this.sides[side_id].cards && this.sides[side_id].cards[card_id]){
            card = this.sides[side_id].cards[card_id];
        }else{
            throw new Error(`side_id or hand_id not exists!`);
        }
        switch(card.type){
            case "summon":
                if(!target.region_id || !target.position_id){
                    throw new Error(`region_id or position_id not specified!`);
                }
                let target_region = this.regions[target.region_id];
                if(!target_region){
                    throw new Error(`target region not correct!`);
                }
                if(target_region.occupied != side_id){
                    throw new Error(`can't summon in a non-occupied region!`);
                }
                let target_postion = target_region.positions[target.position_id];
                if(!target_postion){
                    throw new Error(`target position not correct!`);
                }
                if(target_postion.occupied){
                    throw new Error(`target position already occupied!`);
                }
                break;
            default:
                break;
        }
        card.use_card(target, side_id);
    }

    spawn_avatar(avatar_config, position){
        let side_id = avatar_config.side_id;
        avatar_config.world = this;
        avatar_config.entity_id = utils.generateId(avatar_config.name);
        let new_avatar = new Avatar(avatar_config);
        let region_id = position.region_id;
        let position_id = position.position_id;
        if(this.regions[region_id] && this.regions[region_id].positions[position_id]){
            if(this.regions[region_id].positions[position_id].side_id == side_id){
                if(!this.regions[region_id].positions[position_id].occupied){
                    this.regions[region_id].positions[position_id].occupied = avatar_config.entity_id;
                    new_avatar.set_position(position);
                    this.entities[avatar_config.entity_id] = new_avatar;
                    //TODO... inform clients to cast spawn animation
                    bench_log(`${new_avatar.name}被召唤到: ${this.regions[position.region_id].name} 的位置:${position.position_id}`);
                }else{
                    throw new Error(`position already occupied!`);
                }
            }else{
                throw new Error(`postion not in this side!`);
            }
        }else{
            throw new Error(`position not exists!`);
        }
    }

    set_flags(side_id, region_ids){
        if(!this.logic.check_turn(side_id)){
            throw new Error(`not your turn`);
        }
        let that = this;
        this.logic.clear_flags(side_id);
        region_ids.forEach((region_id)=>{
            that.logic.set_flag(side_id, region_id);
        })
    }

    async end_turn(side_id){
        if(!this.logic.check_turn(side_id)){
            throw new Error(`not your turn`);
        }
        await this.logic.end_turn();
    }

    move_entity(entity, position){
        let entity_id = entity.get_id();
        let current_region_id = entity.position.region_id;
        let current_position_id = entity.position.position_id;
        let entity_side_id = entity.side_id;
        let has_path = this.regions[current_region_id].path[position.region_id];
        if(!has_path){
            throw new Error(`current_region has no path to target position`);
        }
        if(!this.valid_position(position)){
            throw new Error(`invalid position data`);
        }
        if(this.position_occupied(position)){
            throw new Error(`position occupied`);
        }

        if(this.get_position_side_id(position) != entity_side_id){
            throw new Error(`not currect position side`);
        }
        console.log(`move ${entity_id}...`);
        this.regions[position.region_id].positions[position.position_id].occupied = entity_id;
        this.regions[current_region_id].positions[current_position_id].occupied = null;
        entity.set_position(position);
        //TODO... inform clients to cast move animation
        bench_log(`${entity.name} 移动到:${this.regions[position.region_id].name}, 位置:${position.position_id}`)
    }

    valid_position(position){
        return !!this.regions[position.region_id].positions[position.position_id]
    }

    position_occupied(position){
        return !!this.regions[position.region_id].positions[position.position_id].occupied;
    }

    get_position_side_id(position){
        return this.regions[position.region_id].positions[position.position_id].side_id
    }

    get_entity_position(entity_id){
        for(let region_id in this.regions){
            for(let position_id in this.regions[region_id].positions){
                if(this.regions[region_id].positions[position_id].occupied == entity_id){
                    return {
                        region_id:region_id,
                        position_id:position_id
                    };
                }
            }
        }
        throw new Error(`entity not exists!`);
    }

    occupy_region(side_id, region_id){
        if(this.regions[region_id]){
            this.regions[region_id].occupied = side_id;
        }
        //TODO...inform client the ownership change
        bench_log(`${this.regions[region_id].name} 被 ${this.sides[side_id].name} 占领了`);
    }

    entity_die(entity){
        let entity_id = entity.id;
        if(this.entities[entity_id]){
            let position = this.entities[entity_id].get_position();
            this.regions[position.region_id].positions[position.position_id].occupied = null;
            delete this.entities[entity_id];
        }
    }

    end_world(){
        //TODO...summary
        bench_log(`战斗结束`);
        delete global.worlds[this.id];
    }
}


module.exports = World;