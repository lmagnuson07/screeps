var roleMiner = {
    run: function(creep){
        let source = Game.getObjectById(creep.memory.sourceId);
        // save the container in memory, instead of looping.
        let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: s => s.structureType == STRUCTURE_CONTAINER
        })[0];

        if (creep.pos.isEqualTo(container)){
            creep.harvest(source);
        }
        else {
            creep.moveTo(container, {visualizePathStyle: {stroke: "#ffaa00"}});
        }
    }
}

module.exports = roleMiner;