var roleUpgrader = require('role.upgrader');

var roleBuilder = {
    run: function(creep, sourcesIndex) {
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.building = false;
            creep.say('⛏️ harvest');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0){
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length > 0){
                creep.moveTo(targets[0], {visualizePathSize: {stroke: '#ffffff'}});
                creep.build(targets[0]);
            }
            else {
                roleUpgrader.run(creep, (sourcesIndex));
            }
        }
        else {
            let containers = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return (s.structureType == STRUCTURE_CONTAINER && 
                        s.store.getFreeCapacity(RESOURCE_ENERGY) !== s.store.getCapacity(RESOURCE_ENERGY));
                }
            });
            // if there are containers (not empty containers.)
            if (containers.length != 0){
                creep.moveTo(containers[0], {visualizePathStyle: {stroke: "#ffaa00"}});
                creep.withdraw(containers[0], RESOURCE_ENERGY);
            }
            // if no containers (or empty containers), do harvester logic.
            else {
                var sources = creep.room.find(FIND_SOURCES);
                if (sources[sourcesIndex].energy == 0){
                    if (creep.store.getFreeCapacity() !== creep.store.getCapacity()){
                        creep.memory.building = true;
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

module.exports = roleBuilder;