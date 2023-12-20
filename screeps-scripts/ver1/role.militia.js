var roleUpgrader = require('role.upgrader');

// responsible for supplying towers, repairing towers, and eventually attacking enemies. Will upgrade if nothing else is valid.
var roleHarvester = {
    run: function(creep,sourcesIndex){
		if (creep.memory.supplying && creep.store[RESOURCE_ENERGY] == 0){
			creep.memory.supplying = false;
            creep.say('⛏️ harvest');
		}
		if (!creep.memory.supplying && creep.store.getFreeCapacity() == 0){
			creep.memory.supplying = true;
            creep.say('⚒️ supply');
		}
	
		if (creep.memory.supplying){
			var emptyTowers = creep.room.find(FIND_MY_STRUCTURES, {
				filter: (structure) => {
					return structure.structureType == STRUCTURE_TOWER &&
						structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
				}
			});
            var damagedTowers = creep.room.find(FIND_MY_STRUCTURES, {
				filter: (structure) => {
					return structure.structureType == STRUCTURE_TOWER &&
                    structure.hits < structure.hitsMax;
				}
			});
            if (damagedTowers.length > 0){
                creep.moveTo(damagedTowers[0], {visualizePathStyle: {stroke: "#ffaa00"}});
                creep.repair(damagedTowers[0]);
            }
			else if (emptyTowers.length > 0){
				creep.moveTo(emptyTowers[0], {visualizePathStyle: {stroke: "#ffffff"}});
				creep.transfer(emptyTowers[0], RESOURCE_ENERGY);
			}
			else {
                // add code to make him attack an invader if they are in the room.
                roleUpgrader.run(creep,sourcesIndex);
			}
		}
		else {
            var sources = creep.room.find(FIND_SOURCES);
			if (sources[sourcesIndex].energy == 0){
				if (creep.store.getFreeCapacity() !== creep.store.getCapacity()){
					creep.memory.supplying = true;
                }
				else {
					creep.moveTo(sources[1 - sourcesIndex], {visualizePathStyle: {stroke: "#ffaa00"}});
				}
			}
			else {
				creep.moveTo(sources[sourcesIndex], {visualizePathStyle: {stroke: "#ffaa00"}});
				creep.harvest(sources[sourcesIndex]);
			}
		}
    }
}

module.exports = roleHarvester;