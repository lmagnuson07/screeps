var roleUpgrader = {
    run: function(creep, room){
        // sets memory
        if (creep.memory.transfering && creep.store[RESOURCE_ENERGY] === 0){
            creep.memory.transfering = false;
            creep.say('⛏️ upgrade');
        }
        if (!creep.memory.transfering && creep.store.getFreeCapacity() == 0){
            creep.memory.transfering = true;
            creep.say('📦transfer');
        }

        // performs actions on memory
        if (creep.memory.transfering){
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: "#fef08a"}});
			creep.upgradeController(room.controller);
        } else {
            creep.moveTo(room.sources[1], {visualizePathStyle: {stroke: "#ffffff"}});
			creep.harvest(room.sources[1]);
        }
    }
}

module.exports = roleUpgrader;