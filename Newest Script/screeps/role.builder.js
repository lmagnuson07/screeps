let roleRepairer = require('role.repairer');

var roleBuilder = { 
    run: function(args){
        let sourceIndex = args.config.mainRoomSecondSourceIndex;
        args.creep.setMemory(args.config, 'building');

        // performs actions on memory
        if (args.creep.memory.building) {
            if (args.constSites.length > 0) {
                args.creep.moveTo(args.constSites[0], args.config.builderBuildPath());
                args.creep.build(args.constSites[0]);
            } else {
                // delete creep.memory.building;
                roleRepairer.run(args);
            }
        } else {
            if (args.fullStorageContainers.length != 0) {
                args.creep.moveTo(args.fullStorageContainers[0], args.config.builderCollectPath());
                args.creep.withdraw(args.fullStorageContainers[0], RESOURCE_ENERGY);
            } else if (args.fullTanks.length != 0) {
                args.creep.moveTo(args.fullTanks[0], args.config.builderCollectPath());
                args.creep.withdraw(args.fullTanks[0], RESOURCE_ENERGY);
            } else if (args.fullContainerOfOne != null) {
                args.creep.moveTo(args.fullContainerOfOne, args.config.builderCollectPath());
                args.creep.withdraw(args.fullContainerOfOne, RESOURCE_ENERGY);
            } else {
                args.creep.moveTo(args.room.sources[sourceIndex], args.config.builderCollectPath());
                args.creep.harvest(args.room.sources[sourceIndex]);
            }
        }
    }
}

module.exports = roleBuilder;