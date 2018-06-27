const EventEmitter = require("events");
const Avatar = require('../entity/avatar.js');

class Logic extends EventEmitter{
    constructor(world, properties){
        super();
        this.world = world;
        this.victory_conditions = properties.victory_conditions;
        this.current_turn = 1;
        this.side_ids = [];
        this.fill_side_ids(properties);
        this.current_index = 0;
        this.turn_side = this.side_ids[this.current_index];
        this.first_turn = this.turn_side;

        /*
        * [{
        *   "type":"collect_resource",
        *   "victory_num":2000
        * }]
        * */
    }

    fill_side_ids(properties){
        let side_info = properties.side_info;
        side_info.forEach((side)=>{
            let side_id = side.id;
            this.side_ids.push(side_id);
        })
        this.side_ids.shuffle();
    }

    check_turn(side_id){
        return side_id == this.turn_side;
    }

    next_turn(){
        let sides_num = this.side_ids.length;
        this.current_index ++;
        if(this.current_index == sides_num){
            this.current_index = 0;
            this.current_turn ++;
        }
        this.turn_side = this.side_ids[this.current_index];
        this.begin_turn();
    }

    begin_turn(){
        //deploy benefits
        let side_id = this.turn_side;
        console.log(side_id);
        let regions = this.world.regions;
        let user_resource = this.world.sides[side_id].user_resource;
        let total_benefit = {};
        for(let region_id in regions){
            let region = regions[region_id];
            let is_occupied = (region.occupied == side_id);
            if(is_occupied){
                let benefit = region.benefit;
                for(let resource_key in benefit){
                    if(!total_benefit[resource_key]){
                        total_benefit[resource_key] = benefit[resource_key];
                    }else{
                        total_benefit[resource_key] += benefit[resource_key];
                    }
                }
            }
        }
        for(let total_resource_key in total_benefit){
            user_resource.collect_resource(total_resource_key, total_benefit[total_resource_key]);
        }
        //renew Avatar Action;
        let entities = this.world.entities;
        for(let entity_id in entities){
            if(entities[entity_id].side_id == side_id){
                if(entities[entity_id] instanceof Avatar){
                    entities[entity_id].renew_action();
                }
            }
        }
        let victory_check_result = this.victory_check(side_id)
        if(victory_check_result.result){
            //TODO...inform clients the result
            bench_log(`${this.world.sides[this.turn_side].name} 完成了条件 ${victory_check_result.description} 赢得了胜利!`);
            this.world.end_world();
        }else{
            //TODO...inform client to begin turn
            bench_log(`${this.world.sides[this.turn_side].name} 即将开始他的回合`)
        }
    }

    toggle_flag(side_id, region_id){
        let regions = this.world.regions;
        if(regions[region_id].type == "normal"){
            regions[region_id].flags[side_id] = !regions[region_id].flags[side_id];
        }
    }

    clear_flags(side_id){
        let regions = this.world.regions;
        for(let region_id in regions){
            if(regions[region_id].type == "normal"){
                regions[region_id].flags[side_id] = false;
            }
        }
    }

    set_flag(side_id, region_id){
        if(this.world.regions[region_id].type == "normal"){
            this.world.regions[region_id].flags[side_id] = true;
        }
        //TODO...inform target client to show turn
        bench_log(`${this.world.sides[side_id].name} 将: ${this.world.regions[region_id].name} 设为争夺点`);
    }

    async end_turn(){
        let side_id = this.turn_side;
        //TODO...inform all client target client end its turn
        bench_log(`${this.world.sides[side_id].name} 结束了他的回合`);
        let entities = this.world.entities;
        for(let entity_id in entities){
            let entity = entities[entity_id];
            if(entity.side_id == side_id){
                if(entity.ai){
                    await entity.ai.take_action();
                }
            }
        }
        this.next_turn();
    }

    victory_check(side_id){
        let victory = {result:false};
        let scene_resource_name = this.world.sides[side_id].user_resource.scene_resource_name;
        let scene_resource = this.world.sides[side_id].user_resource.get_resource(scene_resource_name);
        this.victory_conditions.forEach((victory_condition)=>{
            switch(victory_condition.type){
                case "collect_resource":
                    let victory_num = victory_condition.victory_num;
                    if(scene_resource >= victory_num){
                        victory.description = `收集到超过 ${victory_num} 个 ${scene_resource_name}`;
                        victory.result = true;
                    }
                    break;
                default:
                    break;
            }
        });
        return victory;
    }
}


module.exports = Logic;