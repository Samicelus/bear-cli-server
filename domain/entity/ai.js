const EventEmitter = require("events");
const dispatcher = require('../../libs/dispatcher.js');
const formula = require('../../consts/formula.js');

class AI extends EventEmitter{
    constructor(entity, world){
        super();
        this.entity = entity;
        this.world = world;
    }

    async take_action(){
        let entity = this.entity;
        let side_id = entity.side_id;
        let position = entity.position;
        let regions = this.world.regions;
        if(entity.action){
            //ATTACK >> MOVE >> STAY
            //ATTACK_DECISION
            //if this region has Enemy, attack, else move
            let attack_decision = decide_attack(this.entity, this.world);
            if(attack_decision.attack){
                let target = attack_decision.target;
                this.entity.attack_other(target);
            }else{
                //MOVE DECISION
                //check nearby region's flag
                let move_decision = decide_move(this.entity, this.world);
                if(move_decision.move){
                    bench_log(`${entity.name} 决定移动到: ${this.world.regions[move_decision.position.region_id].name}, 位置: ${move_decision.position.position_id}`);
                    this.entity.move_to_position(move_decision.position);
                }else{
                    this.entity.stay();
                }
            }
        }else{
            bench_log(`${entity.name} 已经行动过了`);
        }
    }
}

/*
* decide where to move.
* @param
*
*
* @return  <object> {move:<boolean>, position:{region_id:<string>, position_id:<string>}}
*
* @date 20118-06-21
* @author samicelus<50893818@qq.com>
* */

function decide_move(entity, world){
    let side_id = entity.side_id;
    let position = entity.position;
    let regions = world.regions;
    let current_region = regions[position.region_id];
    let current_path = current_region.path;
    let move_targets_info = [];

    //if current_region has flag and no enemy, and no own ==> not move to stay
    if(current_region.occupied != side_id && current_region.flags[side_id]){
        let current_enemy_num = 0;
        for(let position_id in current_region.positions){
            if(current_region.positions[position_id].side_id != side_id && current_region.positions[position_id].occupied){
                current_enemy_num += 1;
            }
        }
        if(current_enemy_num == 0){
            return {move:false};
        }
    }
    for(let region_id in current_path){
        //has flag
        if(current_path[region_id] && regions[region_id].flags[side_id]){
            let available_position_num = 0;
            let enemy_num = 0;
            let ally_num = 0;
            let available_positions = [];
            let target_region = regions[region_id];
            for(let position_id in target_region.positions){
                if(target_region.positions[position_id].side_id == side_id){
                    let target_position = target_region.positions[position_id];
                    if(!target_position.occupied){
                        available_position_num += 1;
                        available_positions.push({
                            region_id: region_id,
                            position_id: position_id
                        });
                    }else{
                        ally_num += 1;
                    }
                }else{
                    let enemy_position = target_region.positions[position_id];
                    if(!enemy_position.occupied){
                        enemy_num += 1;
                    }
                }
            }
            if(available_positions.length > 0){
                move_targets_info.push({
                    region_id: region_id,
                    enemy_num: enemy_num,
                    ally_num: ally_num,
                    available_position_num: available_position_num,
                    available_positions: available_positions,
                    occupied: target_region.occupied,
                    priority: 0x1000
                })
            }
        }else if(regions[region_id]){
            //SECONDARY Path
            let next_region = regions[region_id];
            let next_path = next_region.path;
            for(let next_region_id in next_path){
                if(next_path[next_region_id] && regions[next_region_id].flags[side_id]){
                    let available_position_num = 0;
                    let enemy_num = 0;
                    let ally_num = 0;
                    let available_positions = [];
                    let target_region = regions[next_region_id];
                    //calculate ally_num and enemy_num for target_region
                    for(let position_id in target_region.positions){
                        if(target_region.positions[position_id].side_id == side_id){
                            let target_position = target_region.positions[position_id];
                            if(target_position.occupied){
                                ally_num += 1;
                            }
                        }else{
                            let enemy_position = target_region.positions[position_id];
                            if(!enemy_position.occupied){
                                enemy_num += 1;
                            }
                        }
                    }
                    //calculate available_position for next_region
                    for(let position_id in next_region.positions){
                        if(next_region.positions[position_id].side_id == side_id){
                            let next_position = next_region.positions[position_id];
                            if(!next_position.occupied){
                                available_position_num += 1;
                                available_positions.push({
                                    region_id: region_id,
                                    position_id: position_id
                                });
                            }
                        }
                    }

                    if(available_positions.length > 0){
                        move_targets_info.push({
                            region_id: next_region_id,
                            enemy_num: enemy_num,
                            ally_num: ally_num,
                            available_position_num: available_position_num,
                            available_positions: available_positions,
                            occupied: target_region.occupied,
                            priority: 0x0000
                        })
                    }
                }
            }
        }
    }
    let max_priority = {priority:0x0000, available_positions:[]};
    //1-move-NONE_OCCUPIED(5) >> 2-move-NONE_OCCUPIED(4) >> 1-move-OCCUPIED_BY_ENEMY(3) >>2-move-OCCUPIED_BY_ENEMY(2) >> 1-move-OCCUPIED(1) >> 2-move-OCCUPIED(0)
    //NO_ENEMY&&NO_ALLY >> ENEMY+ALLY >> ONLY_ENEMY >> ONLY_ALLAY
    //ENEMY - ALLy == 1 >> ENEMY == ALLY >> ENEMY - ALLY > 1  >> OTHER
    //available_position_num ++ >> available_position_num --
    move_targets_info.forEach((target_info)=>{
        let priority = target_info.priority;
        if(!target_info.occupied){
            priority += 0x4000;
        }else if(target_info.occupied != side_id){
            priority += 0x2000;
        }else{
            priority += 0x0000;
        }

        if(target_info.enemy_num == 0 && target_info.ally_num == 0){
            priority += 0x0400;
        }else if(target_info.enemy_num > 0 && target_info.ally_num > 0){
            priority += 0x0300;
        }else if(target_info.enemy_num > 0 && target_info.ally_num == 0){
            priority += 0x0200;
        }else{
            priority += 0x0100;
        }

        if(target_info.enemy_num - target_info.ally_num == 1){
            priority += 0x0040;
        }else if(target_info.enemy_num == target_info.ally_num){
            priority += 0x0030;
        }else if(target_info.enemy_num - target_info.ally_num > 1){
            priority += 0x0020;
        }else{
            priority += 0x0010;
        }

        priority += 0x0001 * ((target_info.available_position_num) <= 5 ? target_info.available_position_num: 5);

        if(priority > max_priority.priority){
            max_priority.priority = priority;
            max_priority.available_positions = target_info.available_positions.concat([]);
        }else if(priority == max_priority.priority){
            max_priority.available_positions = max_priority.available_positions.concat(target_info.available_positions);
        }
    })

    if(move_targets_info.length > 0 ){
        let code = Math.round(Math.random()*1000000);
        let dispatch_str = side_id + code;
        return {move:true, position:dispatcher.dispatch(dispatch_str, max_priority.available_positions)};
    }else{
        return {move:false};
    }
}

/*
* decide whom to attack.
* @param
*
*
* @return  <object> {attack:<boolean>, target:<entity>}
*
* @date 20118-06-21
* @author samicelus<50893818@qq.com>
* */

function decide_attack(entity, world){
    let side_id = entity.side_id;
    let position = entity.position;
    let self_series = entity.series;
    let regions = world.regions;
    let current_region = regions[position.region_id];
    let current_has_flags = current_region.flags[side_id];
    if(!current_has_flags){
        //current has no flags, move to other
        return {attack:false};
    }
    let current_region_positions = regions[position.region_id].positions;
    let entities = world.entities;
    let enemies_info = [];
    for(let position_id in current_region_positions){
        if(current_region_positions[position_id].occupied && current_region_positions[position_id].side_id != side_id){
            let target_entity_id = current_region_positions[position_id].occupied
            let target_series = entities[target_entity_id].series;
            let target_hp = entities[target_entity_id].hp;
            enemies_info.push({
                entity_id: target_entity_id,
                series: target_series,
                hp: target_hp,
                priority: 0x0000
            });
        }
    }
    let max_priority = {priority:0x0000, target_enemies:[]};
    //ADVANTAGE >> NONE >> DISADVANTAGE
    //hp -- >> hp ++
    enemies_info.forEach((enemy_info)=>{
        let priority = enemy_info.priority;
        if(formula.is_advantage(self_series, enemy_info.series)){
            priority += 0x3000
        }else if(!formula.is_disadvantage(self_series, enemy_info.series)){
            priority += 0x2000;
        }else{
            priority += 0x1000;
        }
        priority += 0x0001 * ((100 - enemy_info.hp) > 0?100 - enemy_info.hp:0);

        if(priority > max_priority.priority){
            max_priority.priority = priority;
            max_priority.target_enemies = [enemy_info.entity_id];
        }else if(priority == max_priority.priority){
            max_priority.target_enemies.push(enemy_info.entity_id);
        }
    })


    if(enemies_info.length > 0 ){
        let code = Math.round(Math.random()*1000000);
        let dispatch_str = side_id + code;
        let target_entity_id = dispatcher.dispatch(dispatch_str, max_priority.target_enemies)
        return {attack:true, target: entities[target_entity_id]};
    }else{
        return {attack:false};
    }
}


module.exports = AI;