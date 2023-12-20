let roleWallRepairer = require('role.wallrepairer');

var roleRepairer = {
    run: function(args){
        let sourceIndex = args.config.mainRoomSecondSourceIndex;
        let structures = [];
        let roads = [];
        args.creep.setMemory(args.config, 'repairing');

        // Code to repair containers at a certain hit threshold
        structures = args.creep.setRoleRestriction({
            restriction: "hasMineralContainerOverMin",
            restrictedList: args.dmgMineralContainerOverMin,
            fullList: args.dmgMineralContainer,
            newList: args.dmgMineralContainerOverMin,
        });
        if (structures.length === 0) {
            structures = args.creep.setRoleRestriction({
                restriction: "hasStructuresOverMin",
                restrictedList: args.dmgContainersOverMin,
                fullList: args.dmgContainers,
                newList: args.roadsOverMin,
            });
        }
        // Code to repair roads at a certain hit threshold
        roads = args.creep.setRoleRestriction({
            restriction: "hasRoadsOverMin",
            restrictedList: args.roadsOverMin,
            fullList: args.roads,
            newList: args.roadsOverMin,
        });
        structures = structures.length > 0 ? structures : roads;
        
		if (args.creep.memory.repairing){
            if (structures.length > 0) {
                args.creep.moveTo(structures[0], args.config.repairerRepairPath());
                args.creep.repair(structures[0]);
            } else {
                roleWallRepairer.run(args);
            }
		}
		else {
            if (args.fullStorageContainers.length != 0) {
                args.creep.moveTo(args.fullStorageContainers[0], args.config.repairerCollectPath());
                args.creep.withdraw(args.fullStorageContainers[0], RESOURCE_ENERGY);
            } else if (args.fullTanks.length != 0) {
                args.creep.moveTo(args.fullTanks[0], args.config.repairerCollectPath());
                args.creep.withdraw(args.fullTanks[0], RESOURCE_ENERGY);
            } else if (args.fullContainerOfOne != null) {
                args.creep.moveTo(args.fullContainerOfOne, args.config.repairerCollectPath());
                args.creep.withdraw(args.fullContainerOfOne, RESOURCE_ENERGY);
            } else {
                args.creep.moveTo(args.room.sources[sourceIndex], args.config.repairerCollectPath());
                args.creep.harvest(args.room.sources[sourceIndex]);
            }
        }
    }
}

module.exports = roleRepairer;