var roleMiner = {
    run: function(args){
        let source = Game.getObjectById(args.creep.memory.sourceId);
        let flag = Game.flags[args.creep.memory.positionFlag];

        if (args.creep.pos.isEqualTo(flag.pos)) {
            if (args.minerContainer.store.getFreeCapacity(args.creep.memory.resourceType) !== 0) {
                args.creep.harvest(source);
            } else {
                // Move the creep out of the way
                args.creep.moveTo(Game.flags[args.creep.memory.idleFlag]);
            }
        } else {
            if (args.minerContainer.store.getFreeCapacity(args.creep.memory.resourceType) !== 0) {
                args.creep.moveTo(flag);
            } else {
                args.creep.moveTo(Game.flags[args.creep.memory.idleFlag]);
            }
        }
    }
}

module.exports = roleMiner;