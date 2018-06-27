const EventEmitter = require("events");

class Entity extends EventEmitter{
    constructor(properties){
        super();
        this.id = properties.entity_id;
        this.world = properties.world;
        this.name = properties.name;
        this.hp = properties.baseHp;
        this.hp_max = properties.baseHp;
        this.attack = properties.attack;
        this.side_id = properties.side_id;
        this.position = {
            region_id: null,
            position_id: null
        };
    }

    get_id(){
        return this.id;
    }

    set_position(position){
        this.position.region_id = position.region_id;
        this.position.position_id = position.position_id;
    }

    get_position() {
        return this.position;
    }

    die(){
        this.world.entity_die(this);
    }
}

module.exports = Entity;