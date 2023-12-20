var roleBuilder = require('role.builder');

var roleWalRepairer = {
    run: function(creep,sourcesIndex){
		if (creep.memory.repairingwall && creep.store[RESOURCE_ENERGY] == 0){
			creep.memory.repairingwall = false;
            creep.say('⛏️ harvest');
		}
		if (!creep.memory.repairingwall && creep.store.getFreeCapacity() == 0){
			creep.memory.repairingwall = true;
            creep.say('🧱 repair');
		}
	
		if (creep.memory.repairingwall){
			let walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_WALL
            });

            // 300,000,000 / 0.0001 = 30,000 (801 per tick)
            var target = undefined;

            // outer loop increments up until it reaches 1 (100%)
            for (let percentage = 0.0001; percentage <= 1; percentage += 0.0001){
                // loops until it finds a wall with less a percentage less than percentage variable. 
                for (let wall of walls){
                    if ((wall.hits / wall.hitsMax) < percentage){
                        target = wall;
                        break;
                    }
                }
                if (target != undefined){
                    break;
                }
            }
            if (target != undefined) {
                creep.moveTo(target, {visualizePathStyle: {stroke: "#ffaa00"}});
                creep.repair(target);
            }
            else {
                roleBuilder.run(creep,sourcesIndex);
            }
		}
		else {
            let containers = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return (s.structureType == STRUCTURE_CONTAINER && 
                        s.store.getFreeCapacity(RESOURCE_ENERGY) !== s.store.getCapacity(RESOURCE_ENERGY));
                }
            });
            // if there are containers
            if (containers.length != 0){
                creep.moveTo(containers[0], {visualizePathStyle: {stroke: "#ffaa00"}});
                creep.withdraw(containers[0], RESOURCE_ENERGY);
            }
            // if no containers (or empty containers), do harvester logic.
            else {
                var sources = creep.room.find(FIND_SOURCES);
                if (sources[sourcesIndex].energy == 0){
                    if (creep.store.getFreeCapacity() !== creep.store.getCapacity()){
                        creep.memory.repairingwall = true;
                    }
                    else {
                        creep.moveTo(sources[sourcesIndex], {visualizePathStyle: {stroke: "#ffaa00"}});
                    }
                }
                else {
                    creep.moveTo(sources[sourcesIndex], {visualizePathStyle: {stroke: "#ffaa00"}});
                    creep.harvest(sources[sourcesIndex]);
                }
            }
		}
    }
}

module.exports = roleWalRepairer;