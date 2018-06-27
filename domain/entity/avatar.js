const Entity = require('../entity/entity.js');
const AI = require('../entity/ai.js');
const Buff = require('../buff/buff.js');
const formula = require('../../consts/formula.js');

class Avatar extends Entity{
    constructor(properties){
        super(properties);
        if(properties.current_hp){
            this.hp = properties.current_hp;
        }
        this.buffs = {};
        properties.defaultBuffs.map((buff_json)=>{
            this.generate_buff(buff_json);
        });
        this.defaultBuffs = properties.defaultBuffs;
        this.series = properties.series||"none";
        this.action = false;
        this.ai = new AI(this, this.world);
        this.on("die",this.die.bind(this));
    }

    renew_action(){
        this.action = true;
        //TODO...info clients to renew action
        bench_log(`${this.name} 状态更新为: ${this.action?"未行动":"已行动"}`);
    }

    generate_buff(buff_json){
        let new_buff = new Buff(buff_json);
        let buff_id = new_buff.get_id();
        let exist_buff = this.buffs[buff_id];
        if(!exist_buff ||(exist_buff.last != -1 && exist_buff.last < new_buff.last) || new_buff.last == -1){
            this.buffs[buff_id] = new_buff;
        }
    }

    dislodge_buff(buff_if){
        if(this.buffs[buff_if]){
            delete this.buffs[buff_if];
        }
    }

    attack_other(target){
        if(!this.action){
            throw new Error(`already took action`);
        }
        let this_side_id = this.side_id;
        let other_side_id = target.side_id;
        if(this_side_id == other_side_id){
            throw new Error(`can't attack same side`);
        }
        let this_position = this.world.get_entity_position(this.id);
        let other_position = this.world.get_entity_position(target.id);
        if(this_position.region_id != other_position.region_id){
            throw new Error(`can't attack other region`);
        }
        if(formula.is_weak(this.buffs)){
            throw new Error(`can't attack when weak or stunned`);
        }
        this.meal_attack(target);
        //TODO...inform client to cast attack finish animation.
        this.action = false;
        bench_log(`${this.name} 结束攻击, 状态变为: ${this.action?"未行动":"已行动"}`);
    }

    meal_attack(target){
        let self_series = this.series;
        let target_series = target.series;
        let fixed_attack = formula.fixed_attack(this.attack, this.buffs, self_series, target_series);
        target.due_damage(fixed_attack);
        //TODO... inform clients to cast meal attack animation
        bench_log(`${this.name} 对 ${target.name} 造成: ${fixed_attack} 点伤害`);
        //反击
        if(target.hp >= 0 && !formula.is_speed(this.buffs)){
            let target_fixed_attack = formula.fixed_attack(target.attack, target.buffs, target_series, self_series);
            this.due_damage(target_fixed_attack);
            //TODO... inform clients to cast counter attack animation
            bench_log(`${target.name} 对 ${this.name} 造成: ${target_fixed_attack} 点反击伤害`);
        }
    }

    move_to_position(position){
        if(!this.action){
            throw new Error(`already took action`);
        }
        this.world.move_entity(this, position);
        this.action = false;
    }

    stay(){
        this.action = false;
        //TODO... inform client to cast stay animation.
        bench_log(`${this.name} 原地待命，状态变更为: ${this.action?"未行动":"已行动"}`);
        this.judge_region_owner();
    }

    judge_region_owner(){
        let side_id = this.side_id;
        let current_position = this.position;
        let region = this.world.regions[current_position.region_id];
        let rest_enemy_num = 0;
        for(let position_id in region.positions){
            if(region.positions[position_id].side_id != side_id) {
                if(region.positions[position_id].occupied){
                    rest_enemy_num += 1;
                }
            }
        }
        if(rest_enemy_num == 0){
            this.world.occupy_region(side_id, current_position.region_id);
        }
    }

    due_damage(damage){
        if(formula.is_void(this.buffs)){
            damage = 0;
        }
        this.hp -= damage;
        //TODO... inform clients to cast due damage animation
        bench_log(`${this.name} 受到: ${damage} 点伤害, 剩余生命值: ${this.hp}/${this.hp_max}`);
        this.judge_state();
    }

    judge_state(){
        if(this.hp <= 0){
            this.die();
            //TODO... inform clients to cast entity die animation
            bench_log(`${this.name} 被消灭了`);
        }
    }
}

module.exports = Avatar;