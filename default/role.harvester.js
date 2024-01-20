var roleHarvester = {
    run: function(creep, transferTargets, room){
        // Sets memory
        if (creep.memory.transfering && creep.store[RESOURCE_ENERGY] === 0){
            creep.memory.transfering = false;
            creep.say('⛏️ harvest');
        }
        if (!creep.memory.transfering && creep.store.getFreeCapacity() == 0){
            creep.memory.transfering = true;
            creep.say('📦transfer');
        }

        // Performs actions based on memory
        if (creep.memory.transfering){
            creep.moveTo(transferTargets[0], {visualizePathStyle: {stroke: "#fef08a"}});
			creep.transfer(transferTargets[0], RESOURCE_ENERGY);
        } else {
            creep.moveTo(room.sources[0], {visualizePathStyle: {stroke: "#ffffff"}});
			creep.harvest(room.sources[0]);
        }
    }
}
module.exports = roleHarvester;