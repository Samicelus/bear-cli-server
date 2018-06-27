const EventEmitter = require("events");

let resource_name_map = {
    "coin": "召唤币",
    "fire_crystal": "火晶",
    "water_jade": "水玉",
    "living_wood": "活木",
    "shadow_iron": "影铁",
    "holy_stone": "圣石",
    "ore": "源矿",
    "gold": "黄金"
}

class UserResource extends EventEmitter{
    constructor(world, properties){
        super();
        this.world = world;
        this.side_id = properties.side_id;
        this.coin = 0;
        this.fire_crystal = 0;
        this.water_jade = 0;
        this.living_wood = 0;
        this.shadow_iron = 0;
        this.holy_stone = 0;
        this.scene_resource_name = properties.scene_resource_name;
        if(this.scene_resource_name){
            this[this.scene_resource_name] = 0;
        }
    }

    resource_check(costs_obj){
        let enough = true;
        let costs = [];
        for(let resource_type in costs_obj){
            costs.push({
                resource_type:resource_type,
                num:costs_obj[resource_type]
            })
        }
        costs.forEach((cost)=>{
            let resource_type = cost.resource_type;
            let num = cost.num;
            if(this[resource_type] < num){
                enough = false;
            }
        });
        return enough;
    }

    exec_costs(costs_obj){
        let that = this;
        let costs = [];
        for(let resource_type in costs_obj){
            costs.push({
                resource_type:resource_type,
                num:costs_obj[resource_type]
            })
        }
        costs.forEach((cost)=>{
            let resource_type = cost.resource_type;
            let num = cost.num;
            that.cost_resource(resource_type, num);
        })
    }

    cost_resource(resource_type, num){
        this[resource_type] -= num;
        if(this[resource_type] < 0){
            this[resource_type] = 0;
        }
        //TODO...inform clients to decrease resource num
        bench_log(`${this.world.sides[this.side_id].name} 消耗 ${num}个 ${resource_name_map[resource_type]}, 剩余${resource_name_map[resource_type]} 为 ${this[resource_type]} 个`)
    }

    collect_resource(resource_type, num){
        this[resource_type] += num;
        //TODO...inform clients to increase resource num
        bench_log(`${this.world.sides[this.side_id].name} 收集 ${num} 个${resource_name_map[resource_type]}, 剩余 ${resource_name_map[resource_type]} 为 ${this[resource_type]} 个 `)
    }

    get_resource(resource_type){
        return this[resource_type];
    }
}

module.exports = UserResource;