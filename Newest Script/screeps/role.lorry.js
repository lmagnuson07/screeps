var roleLorry = {
    run: function(args){
        args.creep.setMemory(args.config, 'transfering');

        let creepTwo = false;
        if (args.lorriesOne.length > 1) {
            if (args.creep.name === args.lorriesOne[1].name) {
                creepTwo = true;
            }
        }
        
        // Performs actions based on memory
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (args.creep.memory.transfering){
            //-------------------------------------------------------------------------------------------//
            if (creepTwo) {
                if (args.transferTargets.length > 1) {
                    let extensions = args.room.find(FIND_MY_STRUCTURES, { filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }});
                    extensions.sort((a, b) => b.id.localeCompare(a.id));
                    extensions.reverse();
                    args.creep.moveTo(extensions[0], args.config.lorryTransferPath());
                    args.creep.transfer(extensions[0], RESOURCE_ENERGY);
                } else if (args.transferTargets.length === 1 && args.creep.memory.role === "L") { 
                    args.creep.moveTo(args.transferTargets[0], args.config.lorryTransferPath());
                    args.creep.transfer(args.transferTargets[0], RESOURCE_ENERGY);
                } else if (args.storageContainers.length > 0) {
                    args.creep.moveTo(args.storageContainers[0], args.config.lorryTransferPath());
                    args.creep.transfer(args.storageContainers[0], RESOURCE_ENERGY);
                } else if (args.tanks.length > 0) {
                    args.creep.moveTo(args.tanks[0], args.config.lorryTransferPath());
                    args.creep.transfer(args.tanks[0], RESOURCE_ENERGY);
                } else {
                    args.creep.moveTo(Game.flags[args.config.flags.p1], args.config.lorryTransferPath());
                }
            //-------------------------------------------------------------------------------------------//
            } else if (args.creep.memory.mineralLorry) {
                if (args.terminal !== null && !args.creep.memory.lorryContainerNull) {
                    args.creep.moveTo(args.terminal, args.config.mineralLorryTransferPath());
                    args.creep.transfer(args.terminal, args.creep.memory.resourceType);
                } else if (args.storageContainers.length > 0) {
                    args.creep.moveTo(args.storageContainers[0], args.config.mineralLorryTransferPath());
                    args.creep.transfer(args.storageContainers[0], RESOURCE_ENERGY);
                } else if (args.tanks.length > 0) {
                    args.creep.moveTo(args.tanks[0], args.config.mineralLorryTransferPath());
                    args.creep.transfer(args.tanks[0], RESOURCE_ENERGY);
                } else {
                    args.creep.moveTo(Game.flags[args.config.flags.p1], args.config.mineralLorryTransferPath());
                }
            //-------------------------------------------------------------------------------------------//
            } else {
                if (args.linkTwo && args.creep.memory.role === "L") {
                    // The second link isnt full
                    args.creep.moveTo(args.linkTwo, args.config.lorryTransferPath());
                    args.creep.transfer(args.linkTwo, RESOURCE_ENERGY);
                } else if (args.transferTargets.length > 1 && args.creep.memory.role === "L") {
                    // upgrades an extension, since the spawn is always position 0. With the auto spawning, the spawn is only ever empty for 1 tick.
                    args.creep.moveTo(args.transferTargets[1], args.config.lorryTransferPath());
                    args.creep.transfer(args.transferTargets[1], RESOURCE_ENERGY);
                } else if (args.transferTargets.length === 1 && args.creep.memory.role === "L") { 
                    args.creep.moveTo(args.transferTargets[0], args.config.lorryTransferPath());
                    args.creep.transfer(args.transferTargets[0], RESOURCE_ENERGY);
                } else if (args.storageContainers.length > 0) {
                    args.creep.moveTo(args.storageContainers[0], args.config.lorryTransferPath());
                    args.creep.transfer(args.storageContainers[0], RESOURCE_ENERGY);
                } else if (args.tanks.length > 0) {
                    args.creep.moveTo(args.tanks[0], args.config.lorryTransferPath());
                    args.creep.transfer(args.tanks[0], RESOURCE_ENERGY);
                } else {
                    if (args.creep.memory.role === "L") {
                        args.creep.moveTo(Game.flags[args.config.flags.p1], args.config.lorryTransferPath());
                    } else if (args.creep.memory.role === "L2") {
                        args.creep.moveTo(Game.flags[args.config.flags.p2], args.config.lorryTransferPath());
                    }
                }
            }
            //-------------------------------------------------------------------------------------------//
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        } else {
            //-------------------------------------------------------------------------------------------//
            if (creepTwo) {
                if (args.lorryContainer != null) {
                    args.creep.moveTo(args.lorryContainer, args.config.lorryCollectPath());
                    args.creep.withdraw(args.lorryContainer, RESOURCE_ENERGY);
                } else {
                    args.creep.moveTo(Game.flags[args.config.flags.p1], args.config.lorryTransferPath());
                }
            //-------------------------------------------------------------------------------------------//
            } else if (args.creep.memory.mineralLorry) {
                args.lorryContainer = args.creep.setRoleRestrictionSingle({
                    restriction: "hasMineralContainerAtCapacity",
                    restrictedItem: args.atCapacityContainerOfThree,
                    fullItem: args.dmgMineralContainer,
                    newItem: null,
                });
                args.creep.memory.lorryContainerNull = args.lorryContainer ? false : true;
                if (args.lorryContainer != null) {
                    args.creep.moveTo(args.lorryContainer, args.config.mineralLorryCollectPath());
                    args.creep.withdraw(args.lorryContainer, args.creep.memory.resourceType);
                } else if (args.fullContainerOfTwo) {
                    args.creep.moveTo(args.containers[args.config.areaTwoIndex], args.config.mineralLorryCollectPath());
                    args.creep.withdraw(args.containers[args.config.areaTwoIndex], RESOURCE_ENERGY);
                } else {
                    args.creep.moveTo(Game.flags[args.config.flags.p2], args.config.lorryTransferPath());
                }
            //-------------------------------------------------------------------------------------------//
            } else {
                if ( (args.transferTargets.length > 1 || args.linkTwo) && args.creep.memory.role === "L") {
                    if (args.fullStorageContainers.length != 0) {
                        args.creep.moveTo(args.fullStorageContainers[0], args.config.lorryCollectPath());
                        args.creep.withdraw(args.fullStorageContainers[0], RESOURCE_ENERGY);
                    } else {
                        args.creep.moveTo(args.fullTanks[0], args.config.lorryCollectPath());
                        args.creep.withdraw(args.fullTanks[0], RESOURCE_ENERGY);
                    }
                } else {
                    if (args.lorryContainer != null) {
                        args.creep.moveTo(args.lorryContainer, args.config.lorryCollectPath());
                        args.creep.withdraw(args.lorryContainer, RESOURCE_ENERGY);
                    } else {
                        if (args.creep.memory.role === "L") {
                            args.creep.moveTo(Game.flags[args.config.flags.p1], args.config.lorryTransferPath());
                        } else if (args.creep.memory.role === "L2") {
                            args.creep.moveTo(Game.flags[args.config.flags.p2], args.config.lorryTransferPath());
                        }
                    }
                }
            }
            //-------------------------------------------------------------------------------------------//
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
}

module.exports = roleLorry;