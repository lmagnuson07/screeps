var roleUpgrader = {
    run: function(args){
        let containerIndex = args.config.areaTwoIndex;
        let sourceIndex = args.config.mainRoomSecondSourceIndex;
        args.creep.setMemory(args.config, 'transfering', 'repairing');
 
        // performs actions on memory
        if (args.creep.memory.repairing) {
            if (args.containers[containerIndex].hits === args.containers[containerIndex].hitsMax) {
                args.creep.memory.repairing = false;
            } 
            args.creep.repair(args.containers[containerIndex]);
            args.creep.say(args.config.phrases.repairing);
        }
        
        if (args.creep.memory.transfering){
            if (args.containers[containerIndex] && args.containers[containerIndex].hits <= args.config.containerMinHits && !args.creep.memory.isDamaged) {
                args.creep.memory.isDamaged = true;
            }
            if (args.containers[containerIndex] && args.creep.memory.isDamaged) {
                args.creep.moveTo(args.containers[containerIndex], args.config.repairerRepairPath());
                args.creep.repair(args.containers[containerIndex]);
                if (args.containers[containerIndex] && args.containers[containerIndex].hits === args.containers[containerIndex].hitsMax) {
                    args.creep.memory.isDamaged = false;
                }
            } else {
                args.creep.memory.isDamaged = false;
                args.creep.moveTo(args.creep.room.controller, args.config.upgraderUpgradePath());
                args.creep.upgradeController(args.room.controller);
            }
        } else {
            // If we have a container
            if (args.fullContainerOfTwo != null) {
                // Makes upgraders repair their own container but only after they have withdrawn energy
                if (args.fullLinkOne && !args.creep.memory.isDamaged) {
                    // Bug fix
                    if (args.creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
                        args.creep.memory.transfering = true;
                    }
                    args.creep.moveTo(args.fullLinkOne, args.config.upgraderCollectPath());
                    args.creep.withdraw(args.fullLinkOne, RESOURCE_ENERGY);
                } else {
                    if (args.creep.memory.isDamaged) {
                        args.creep.moveTo(args.fullContainerOfTwo, args.config.upgraderCollectPath());
                        let withdrawResult = args.creep.withdraw(args.fullContainerOfTwo, RESOURCE_ENERGY);
                        if ((args.containers[containerIndex].hits < args.containers[containerIndex].hitsMax) && withdrawResult === 0) {
                            args.creep.memory.repairing = true;
                            // bugfix
                            if (args.creep.memory.role !== "ML") args.creep.memory.transfering = false;
                        }
                    } else {
                        args.creep.moveTo(args.fullContainerOfTwo, args.config.upgraderCollectPath());
                        args.creep.withdraw(args.fullContainerOfTwo, RESOURCE_ENERGY);
                    }
                }
            // if we have a link that has energy
            } else if (args.fullLinkOne) {
                args.creep.moveTo(args.fullLinkOne, args.config.upgraderCollectPath());
                args.creep.withdraw(args.fullLinkOne, RESOURCE_ENERGY);
            } else {
                args.creep.moveTo(args.room.sources[sourceIndex], args.config.upgraderCollectPath());
                args.creep.harvest(args.room.sources[sourceIndex]);
            }
        }
    }
}

module.exports = roleUpgrader;