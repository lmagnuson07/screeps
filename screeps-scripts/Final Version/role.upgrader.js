
var roleUpgrader = {
    run: function(creep,sourcesIndex){
		if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0){
			creep.memory.upgrading = false;
			creep.say('⛏️ harvest');
		}
		if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0){
			creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
		}
	
		if (creep.memory.upgrading){
			creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: "#ffffff"}});
			creep.upgradeController(creep.room.controller);
		}
		else {
            var sources = creep.room.find(FIND_SOURCES);
            if (sources[sourcesIndex].energy == 0){
                if (creep.store.getFreeCapacity() !== creep.store.getCapacity()){
                    creep.memory.upgrading = true;
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

module.exports = roleUpgrader;