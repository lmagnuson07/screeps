let roleMilitia = require('role.militia');

var roleGravekeeper = {
    run: function(args){
        args.creep.setMemory(args.config, 'transferbody');

        if (args.tombstones.length > 0 || args.droppedResourceEnergy.length > 0) {
            args.creep.memory.gravekeeping = true;
        } else {
            args.creep.memory.gravekeeping = false;
        }

        if (args.creep.memory.gravekeeping && !args.creep.memory.transferbody){
            if (args.tombstones.length > 0) {
                args.creep.moveTo(args.tombstones[0], args.config.graveKeeperCollectPath());
                args.creep.withdraw(args.tombstones[0], RESOURCE_ENERGY);
            } else if (args.droppedResourceEnergy.length > 0) {
                args.creep.moveTo(args.droppedResourceEnergy[0], args.config.graveKeeperCollectPath());
                args.creep.pickup(args.droppedResourceEnergy[0], RESOURCE_ENERGY);
            } else {
                roleMilitia.run(args);
            }
		}
		else if (args.creep.memory.gravekeeping && args.creep.memory.transferbody) {
            if (args.storageContainers.length > 0) {
                args.creep.moveTo(args.storageContainers[0], args.config.graveKeeperTransferPath());
                args.creep.transfer(args.storageContainers[0], RESOURCE_ENERGY);
            } else if (args.tanks.length > 0) {
                args.creep.moveTo(args.tanks[0], args.config.graveKeeperTransferPath());
                args.creep.transfer(args.tanks[0], RESOURCE_ENERGY);
            } 
        } else if (!args.creep.memory.gravekeeping) {
            roleMilitia.run(args);
        }
    }
}

module.exports = roleGravekeeper;