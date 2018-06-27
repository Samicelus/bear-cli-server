let formula = {};

formula.is_advantage = function(self_series, target_series){
    let result = false;
    switch(self_series){
        case "fire":
            if(target_series == "air"){
                result = true
            }
            break;
        case "water":
            if(target_series == "fire"){
                result = true
            }
            break;
        case "air":
            if(target_series == "terre"){
                result = true
            }
            break;
        case "terre":
            if(target_series == "water"){
                result = true
            }
            break;
        default:
            break;
    }
    return result;
};

formula.is_disadvantage = function(self_series, target_series){
    let result = false;
    switch(self_series){
        case "fire":
            if(target_series == "water"){
                result = true
            }
            break;
        case "water":
            if(target_series == "terre"){
                result = true
            }
            break;
        case "air":
            if(target_series == "fire"){
                result = true
            }
            break;
        case "terre":
            if(target_series == "air"){
                result = true
            }
            break;
        default:
            break;
    }
    return result;
};

formula.fixed_attack = function(attack, buffs, self_series, target_series){
    let original_attack = attack;
    let final_attack = original_attack;
    self_series = self_series||"none";
    target_series = target_series||"none";
    for(let buff_id in buffs){
        if(buffs[buff_id].type == "buff" && buffs[buff_id].detail && buffs[buff_id].detail.attack){
            final_attack += buffs[buff_id].detail.attack;
        }
    }
    if(formula.is_advantage(self_series, target_series)){
        final_attack *= 1.5;
    }
    if(formula.is_disadvantage(self_series, target_series)){
        final_attack *= 0.7;
    }
    return Math.ceil(final_attack);
};

formula.is_speed = function(buffs){
    let speed = false;
    for(let buff_id in buffs){
        if(buffs[buff_id].type == "state" && buffs[buff_id].state && buffs[buff_id].state.speed){
            speed = true;
        }
    }
    return speed;
};

formula.is_void = function(buffs){
    let void_body = false;
    for(let buff_id in buffs){
        if(buffs[buff_id].type == "state" && buffs[buff_id].state && buffs[buff_id].state.void_body){
            void_body = true;
        }
    }
    return void_body;
};

formula.is_weak = function(buffs){
    let weak = false;
    for(let buff_id in buffs){
        if(buffs[buff_id].type == "state" && buffs[buff_id].state && (buffs[buff_id].state.weak||buffs[buff_id].state.stunned)){
            weak = true;
        }
    }
    return weak;
}

module.exports = formula;