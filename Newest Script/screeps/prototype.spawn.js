var prototypeSpawn = {
    run: function() {
        Spawn.prototype.cc = function(totalEnergy, name, role, parts=null) {
            let body = [];
            name = this.getCreepName(name);
            if (totalEnergy >= 1800) {
                if (parts) {
                    body = [
                        WORK, WORK, WORK, WORK,  
                        CARRY, CARRY, CARRY, CARRY,
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                    ];
                } else {
                    body = [
                        WORK, WORK, WORK, WORK, WORK, WORK, 
                        CARRY, CARRY, CARRY, CARRY,
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                    ];
                }
            } else if (totalEnergy >= 1300) {
                if (parts) {
                    body = [
                        WORK, WORK, WORK, WORK, 
                        CARRY, CARRY, CARRY, CARRY,
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                    ];
                } else {
                    body = [
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY,
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                    ];
                }
            } else if (totalEnergy >= 800) {
                if (parts) {
                    body = [
                        WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY,
                        MOVE, MOVE, MOVE, MOVE, MOVE
                    ];
                } else {
                    body = [
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY,
                        MOVE, MOVE, MOVE
                    ];
                }
            } else if (totalEnergy >= 550) {
                body = [
                    WORK, WORK, WORK,
                    CARRY, CARRY,
                    MOVE
                ];
            } else if (totalEnergy >= 300) {
                body = [
                    WORK, WORK, 
                    CARRY, 
                    MOVE
                ];
            }  
            return this.spawnCreep(body, name, { memory: { role: role } });
        }

        Spawn.prototype.cMiner = function(totalEnergy, name, role, sourceId, positionFlag, idleFlag, resourceType) {
            name = this.getCreepName(name);
            let body = [];
            let spawnTime = 0;
            // Mineral miner. Might want to change how this logic works
            if (totalEnergy >= 1800) {
                body = [
                    WORK, WORK, WORK, WORK,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                ];
            } else if (totalEnergy >= 800) {
                body = [
                    WORK, WORK, WORK, WORK, WORK, 
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                ];
            } else if (totalEnergy >= 550) {
                body = [
                    WORK, WORK, WORK, WORK, WORK, 
                    MOVE
                ];
            } else if (totalEnergy >= 300) {
                body = [
                    WORK, WORK, 
                    MOVE, MOVE
                ];
            } 
            spawnTime = body.length * CREEP_SPAWN_TIME;
            
            return this.spawnCreep(
                body,
                name,
                { 
                    memory: {
                        role: role,
                        sourceId: sourceId,
                        positionFlag: positionFlag,
                        idleFlag: idleFlag,
                        spawnTime: spawnTime,
                        resourceType: resourceType,
                    }
                }
            );
        }

        Spawn.prototype.cLorry = function(totalEnergy, name, role, resourceType, mineralLorry) {
            name = this.getCreepName(name);
            let body = [];
            if (totalEnergy >= 1800) {
                body = [
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                ];
            } else if (totalEnergy >= 1300) {
                body = [
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                ];
            } else if (totalEnergy >= 800) {
                body = [
                    CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                ];
            } else if (totalEnergy >= 550) {
                body = [
                    CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                ];
            } else if (totalEnergy >= 300) {
                body = [
                    CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE
                ];
            } 
            return this.spawnCreep(
                body, 
                name, 
                { 
                    memory: { 
                        role: role, 
                        resourceType: resourceType,
                        mineralLorry: mineralLorry
                    }
                }
            );
        }

        Spawn.prototype.cLongDistanceHarvester = function(
            totalEnergy, name, role, homeRoom, 
            targetRoom, containerId, targetRoomSourceId, targetRoomExitX, targetRoomExitY, 
            homeRoomExitRightX, homeRoomExitRightY, idleFlag
        ) {
            name = this.getCreepName(name);
            let body = [];
            if (totalEnergy >= 1300) {
                body = [
                    WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, 
                ];
            } else if (totalEnergy >= 800) {
                body = [
                    WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, 
                ];
            } 
            spawnTime = body.length * CREEP_SPAWN_TIME;

            return this.spawnCreep(
                body, 
                name, 
                {
                    memory: { 
                        role: role, 
                        homeRoom: homeRoom,
                        targetRoom: targetRoom,
                        containerId: containerId,
                        targetRoomSource: targetRoomSourceId,
                        targetRoomExitX: targetRoomExitX, 
                        targetRoomExitY: targetRoomExitY,
                        homeRoomExitRightX: homeRoomExitRightX,
                        homeRoomExitRightY: homeRoomExitRightY,
                        idleFlag: idleFlag,
                        spawnTime: spawnTime
                    }
                }
            );
        }

        Spawn.prototype.getCreepName = function(name) {
            let newName = name + Math.floor(Math.random() * 10);
            this.updateMemoryCreeps();

            // If the creep exists, use recursion 
            if (Game.creeps[newName]) {
                newName = this.getCreepName(name);
            }

            return newName;
        }

        Spawn.prototype.updateMemoryCreeps = function() {
            // clear memory
            for (let name in Memory.creeps){
                if (!Game.creeps[name]){
                    delete Memory.creeps[name];
                }
            }
        }
    }
}
module.exports = prototypeSpawn;