var roleBuilder = {
    run: function(creep, targets, room){
        // sets memory
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.building = false;
            creep.say('⛏️ harvest');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0){
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        // performs actions on memory
        if (creep.memory.building) {
            creep.moveTo(targets[0], {visualizePathSize: {stroke: '#ffffff'}});
            creep.build(targets[0]);
        } else {
            creep.moveTo(room.sources[0], {visualizePathStyle: {stroke: "#fef08a"}});
            creep.harvest(room.sources[0]);
        }
    }
}

module.exports = roleBuilder;