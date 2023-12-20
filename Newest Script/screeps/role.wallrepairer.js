let roleHarvester = require('role.harvester');

var roleWallRepairer = {
    run: function(args){
        let sourceIndex = args.config.mainRoomMainSourceIndex;
        args.creep.setMemory(args.config, 'repairingwall');
	
		if (args.creep.memory.repairingwall){
            // 300,000,000 / 0.0001 = 30,000 (801 per tick)
            var target = undefined;

            // outer loop increments up until it reaches 1 (100%)
            for (let percentage = 0.0001; percentage <= 1; percentage += 0.0001){
                // loops until it finds a wall with less a percentage less than percentage variable. 
                for (let wall of args.walls){
                    if ((wall.hits / wall.hitsMax) < percentage){
                        target = wall;
                        break;
                    }
                }
                if (target != undefined){
                    break;
                }
            }
            if (target != undefined) {
                args.creep.moveTo(target, args.config.repairerRepairPath());
                args.creep.repair(target);
            }
            else {
                roleHarvester.run(args);
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

module.exports = roleWallRepairer;