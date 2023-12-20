var roleLongDistanceHarvester = {
    run: function(creep){
		if (creep.memory.transfering && creep.store[RESOURCE_ENERGY] == 0){
			creep.memory.transfering = false;
            creep.say('⛏️ harvest');
		}
		if (!creep.memory.transfering && creep.store.getFreeCapacity() == 0){
			creep.memory.transfering = true;
            creep.say('📦transfer');
		}
	
		if (creep.memory.transfering){
            // if creep is in the home room.
            if (creep.room.name == creep.memory.home){
                var targets = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                // upgrades an extension, since the spawn is always position 0. With the auto spawning, the spawn is only evey empty for 1 tick.
                if (targets.length > 1){
                    creep.moveTo(targets[1], {visualizePathStyle: {stroke: "#ffffff"}});
                    creep.transfer(targets[1], RESOURCE_ENERGY);
                }
                else if (targets.length == 1){
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: "#ffffff"}});
                    creep.transfer(targets[0], RESOURCE_ENERGY);
                }
            }
			else {
                // find exit to home. 
                if (creep.memory.parts === "longdistanceleft"){
                    creep.moveTo(new RoomPosition(0,28,creep.memory.home), {visualizePathStyle: {stroke: "#ffaa00"}});
                }
                else if (creep.memory.parts === "longdistanceright"){
                    creep.moveTo(new RoomPosition(49,29,creep.memory.home), {visualizePathStyle: {stroke: "#ffffff"}});
                }
            }
		}
		else {
            if (creep.room.name == creep.memory.target){
                var sources = creep.room.find(FIND_SOURCES);
                if (sources[0].energy === 0){
                    creep.memory.transfering = true;
                }
                else {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: "#ffaa00"}});
                    creep.harvest(sources[0]);
                }
            }
            else {
                // find exit to target room
                if (creep.memory.parts === "longdistanceleft"){
                    creep.moveTo(new RoomPosition(49,28,creep.memory.target), {visualizePathStyle: {stroke: "#ffaa00"}});
                }
                else if (creep.memory.parts === "longdistanceright"){
                    creep.moveTo(new RoomPosition(0,29,creep.memory.target), {visualizePathStyle: {stroke: "#ffaa00"}});
                }
            }
		}
    }
}

module.exports = roleLongDistanceHarvester;