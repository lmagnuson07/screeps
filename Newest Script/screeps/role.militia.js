let roleBuilder = require('role.builder');
let roleRepairer = require('role.repairer');

// responsible for supplying towers, repairing towers, and eventually attacking enemies. Will upgrade if nothing else is valid.
var roleMilitia = {
    run: function(args){
        let sourceIndex = args.config.mainRoomSecondSourceIndex;
        args.creep.setMemory(args.config, 'supplying');
	
		if (args.creep.memory.supplying){
            if (args.damagedTowers.length > 0){
                args.creep.moveTo(args.damagedTowers[0], args.config.repairerRepairPath());
                args.creep.repair(args.damagedTowers[0]);
            }
			else if (args.emptyTowers.length > 0){
				args.creep.moveTo(args.emptyTowers[0], args.config.repairerRepairPath());
				args.creep.transfer(args.emptyTowers[0], RESOURCE_ENERGY);
			}
			else {
                // add code to make him attack an invader if they are in the room.
                if (args.creep.memory.role === "GK" && !args.config.graveKeeperBuilds) {
                    roleRepairer.run(args);
                } else {
                    roleBuilder.run(args);
                }
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

module.exports = roleMilitia;