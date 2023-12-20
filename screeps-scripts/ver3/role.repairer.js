var roleRepairer = {
    run: function(creep,structures,room){
		if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0){
			creep.memory.repairing = false;
            creep.say('⛏️ harvest');
		}
		if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0){
			creep.memory.repairing = true;
            creep.say('🛠️ repair');
		}
	
		if (creep.memory.repairing){
            creep.moveTo(structures[0], {visualizePathStyle: {stroke: "#ffaa00"}});
            creep.repair(structures[0]);
		}
		else {
            creep.moveTo(room.sources[0], {visualizePathStyle: {stroke: "#fef08a"}});
            creep.harvest(room.sources[0]);
        }
    }
}

module.exports = roleRepairer;