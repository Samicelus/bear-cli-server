const EventEmitter = require("events");

class Card extends EventEmitter{
    constructor(world, properties){
        super();
        this.world = world;
        this.id = properties.id;
        this.name = properties.name;
        this.type = properties.type;
        this.summon = properties.summon;
        this.costs = properties.costs;
    }

    to_JSON(){
        return {
            id:this.id,
            name:this.name,
            type:this.type,
            summon: this.summon,
            costs:this.costs
        }
    }

    use_card(target, side_id){
        let enough = this.world.sides[side_id].user_resource.resource_check(this.costs);
        if(!enough){
            throw new Error(`not enough resource`);
        }
        this.world.sides[side_id].user_resource.exec_costs(this.costs);
        switch(this.type){
            case "summon":
                let position = target;
                let avatar_properties = {};
                for(let properties in this.summon){
                    avatar_properties[properties] = this.summon[properties];
                }
                avatar_properties.side_id = side_id;
                this.world.spawn_avatar(avatar_properties, position);
                break;
            default:
                break;
        }
    }
}

module.exports = Card;