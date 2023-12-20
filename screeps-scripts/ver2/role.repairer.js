var roleBuilder = require('role.builder');

var roleRepairer = {
    run: function(creep,sourcesIndex){
		if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0){
			creep.memory.repairing = false;
            creep.say('⛏️ harvest');
		}
		if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0){
			creep.memory.repairing = true;
            creep.say('🛠️ repair');
		}
	
		if (creep.memory.repairing){
			let structures = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });

            structures.sort((a,b) => a.hits - b.hits);
            if (structures.length > 0) {
                creep.moveTo(structures[0], {visualizePathStyle: {stroke: "#ffaa00"}});
                creep.repair(structures[0]);
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
                        creep.memory.repairing = true;
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

module.exports = roleRepairer;