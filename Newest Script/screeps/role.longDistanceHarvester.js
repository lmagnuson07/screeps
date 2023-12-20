var roleLongDistanceHarvester = {
    run: function(args){
        args.creep.setMemory(args.config, 'transfering');

        // Performs actions based on memory
        if (args.creep.memory.transfering) {
            // We start in the target room with full inventory
            // If we are in home room, transfer to the link
            if (args.creep.room.name === args.creep.memory.homeRoom) {
                // Fill the container/link
                let container = Game.getObjectById(args.creep.memory.containerId);
                if (container && container.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    args.creep.moveTo(container, args.config.harvesterTransferPath());
                    args.creep.transfer(container, RESOURCE_ENERGY);
                } else {
                    // Do something else if the link is full
                    args.creep.moveTo(Game.flags[args.creep.memory.idleFlag], args.config.harvesterTransferPath());
                }
            } else {
                // else find exit to home 
                args.creep.moveTo(
                    new RoomPosition(
                        args.creep.memory.homeRoomExitRightX, 
                        args.creep.memory.homeRoomExitRightY, 
                        args.creep.memory.homeRoom
                    ), 
                    args.config.harvesterTransferPath()
                )
            }
            
        } else {
            // Move to the next room (transfering false)
            // if in the target room
            if (args.creep.room.name === args.creep.memory.targetRoom) {
                // harvest from the source using memory object
                let source = Game.getObjectById(args.creep.memory.targetRoomSource);
                if (source.energy === 0) {
                    args.creep.memory.transfering = true;
                } else {
                    args.creep.moveTo(source, args.config.harvesterHarvestPath());
                    args.creep.harvest(source);
                }
            } else {
                // Find exit to target room (using x and y cords on memory)
                args.creep.moveTo(
                    new RoomPosition(
                        args.creep.memory.targetRoomExitx, 
                        args.creep.memory.targetRoomExitY, 
                        args.creep.memory.targetRoom
                    ), 
                    args.config.harvesterHarvestPath()
                )
            }
        }
    }
}

module.exports = roleLongDistanceHarvester;