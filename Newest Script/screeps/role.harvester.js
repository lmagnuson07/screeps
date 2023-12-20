let roleUpgrader = require('role.upgrader');

var roleHarvester = {
    run: function(args){
        let sourceIndex = args.config.mainRoomSecondSourceIndex;
        args.creep.setMemory(args.config, 'transfering');
        
        // Performs actions based on memory
        if (args.creep.memory.transfering){
            if (args.transferTargets.length > 0) {
                args.creep.moveTo(args.transferTargets[0], args.config.harvesterTransferPath());
                args.creep.transfer(args.transferTargets[0], RESOURCE_ENERGY);
            } else {
                // delete creep.memory.transfering;
                roleUpgrader.run(args);
            }
        } else {
            if (args.fullStorageContainers.length != 0) {
                args.creep.moveTo(args.fullStorageContainers[0], args.config.harvesterHarvestPath());
                args.creep.withdraw(args.fullStorageContainers[0], RESOURCE_ENERGY);
            } else if (args.fullTanks.length != 0) {
                args.creep.moveTo(args.fullTanks[0], args.config.harvesterHarvestPath());
                args.creep.withdraw(args.fullTanks[0], RESOURCE_ENERGY);
            } else if (args.fullContainerOfOne != null) {
                args.creep.moveTo(args.fullContainerOfOne, args.config.harvesterHarvestPath());
                args.creep.withdraw(args.fullContainerOfOne, RESOURCE_ENERGY);
            } else {
                args.creep.moveTo(args.room.sources[sourceIndex], args.config.harvesterHarvestPath());
                args.creep.harvest(args.room.sources[sourceIndex]);
            }
        }
    }
}

module.exports = roleHarvester;