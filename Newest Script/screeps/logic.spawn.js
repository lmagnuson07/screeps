function runSpawnLogic(config, counts, room, spawn, spawnEnergy, containersOfOne, containersOfTwo) {
    // Getting Creeps by Role
    let {
        totalCreeps, harvesterCount, upgraderCount,
        builderCount, repairerCount, minerCount, minerTwoCount, 
        mineralMinerOneCount, mineralLorryOneCount,
        lorryCount, lorryTwoCount, militiaCount, wallRepairerCount,
        longDistanceHarvesterCount, graveKeeperCount
    } = counts;

    // Counts max values
    let creepMax = config.creepMax();
    let harvesterMax = config.harvesterMax;
    let upgraderMax = config.upgraderMax;
    let builderMax = config.builderMax;
    let repairerMax = config.repairerMax;
    let minerMax = config.minerMax;
    let minerTwoMax = config.minerTwoMax;
    let mineralMinerOneMax = config.mineralMinerOneMax;
    let lorryMax = config.lorryMax;
    let lorryTwoMax = config.lorryTwoMax;
    let mineralLorryOneMax = config.mineralLorryOneMax;
    let militiaMax = config.militiaMax;
    let wallRepairerMax = config.wallRepairerMax;
    let longDistanceHarvesterMax = config.longDistanceHarvesterMax;
    let graveKeeperMax = config.graveKeeperMax;

    // Print Creep Counts
    console.log('///////////////////')
    console.log(`Creeps: ${totalCreeps}/${creepMax} {${config.creepMin}}`);
    if (harvesterCount > 0 || harvesterMax > 0) console.log(`Harvesters: ${harvesterCount}/${harvesterMax}`);
    if (upgraderCount > 0 || upgraderMax > 0) console.log(`Upgraders: ${upgraderCount}/${upgraderMax}`);
    if (builderCount > 0 || builderMax > 0) console.log(`Builders: ${builderCount}/${builderMax}`);
    if (repairerCount > 0 || repairerMax > 0) console.log(`Repairers: ${repairerCount}/${repairerMax}`);
    if (minerCount > 0 || minerMax > 0) console.log(`Miner: ${minerCount}/${minerMax}`);
    if (minerTwoCount > 0 || minerTwoMax > 0) console.log(`Miner2: ${minerTwoCount}/${minerTwoMax}`);
    if (mineralMinerOneCount > 0 || mineralMinerOneMax > 0) console.log(`Mineral Miners: ${mineralMinerOneCount}/${mineralMinerOneMax}`);
    if (lorryCount > 0 || lorryMax > 0) console.log(`Lorry: ${lorryCount}/${lorryMax}`);
    if (lorryTwoCount > 0 || lorryTwoMax > 0) console.log(`Lorry2: ${lorryTwoCount}/${lorryTwoMax}`);
    if (mineralLorryOneCount > 0 || mineralLorryOneMax > 0) console.log(`Mineral Lorries: ${mineralLorryOneCount}/${mineralLorryOneMax}`);
    if (militiaCount > 0 || militiaMax > 0) console.log(`Militia: ${militiaCount}/${militiaMax}`);
    if (wallRepairerCount > 0 || wallRepairerMax > 0) console.log(`Wall Repairers: ${wallRepairerCount}/${wallRepairerMax}`);
    if (longDistanceHarvesterCount > 0 || longDistanceHarvesterMax > 0) console.log(`Long Distance Harvester: ${longDistanceHarvesterCount}/${longDistanceHarvesterMax}`);
    if (graveKeeperCount > 0 || graveKeeperMax > 0) console.log(`Gravekeepers: ${graveKeeperCount}/${graveKeeperMax}`);

    // Spawn logic
    if (totalCreeps < creepMax) {
        // Only try to spawn if we have the right amount of energy or it increments the creepCount property
        if (room.energyAvailable >= config.availableEnergyCap) {

            if (containersOfOne === null && containersOfTwo === null) {
                if (harvesterCount < harvesterMax) {
                    spawn.cc(spawnEnergy, 'Harvester', 'H');		
                } else if (upgraderCount < upgraderMax) {
                    spawn.cc(spawnEnergy, 'Upgrader', 'U');		
                } else if (builderCount < builderMax) {
                    spawn.cc(spawnEnergy, 'Builder', 'B');
                } else if (repairerCount < repairerMax) {
                    spawn.cc(spawnEnergy, 'Repairer', 'R');
                } else if (militiaCount < militiaMax) {
                    spawn.cc(spawnEnergy, 'Militia', 'ML');
                } else if (wallRepairerCount < wallRepairerMax) {
                    spawn.cc(spawnEnergy, 'Wallrepairer', 'WR');
                } else if (graveKeeperCount < graveKeeperMax) {
                    spawn.cc(spawnEnergy, 'Gravekeeper', 'GK', true);
                }

            } else if (containersOfOne !== null && containersOfTwo === null) {
                if (minerCount < minerMax) {
                    if (spawnEnergy === SPAWN_ENERGY_CAPACITY) {
                        spawn.cMiner(
                            SPAWN_ENERGY_CAPACITY, 
                            'Miner', 
                            'M', 
                            room.sources[config.mainRoomMainSourceIndex].id, 
                            config.flags.l1, 
                            config.flags.p1,
                            RESOURCE_ENERGY
                        );
                    } else {
                        spawn.cMiner(
                            config.minerOneCost, 
                            'Miner', 
                            'M', 
                            room.sources[config.mainRoomMainSourceIndex].id, 
                            config.flags.l1, 
                            config.flags.p1,
                            RESOURCE_ENERGY
                        );
                    }
                } else if (lorryCount < lorryMax) {
                    spawn.cLorry(spawnEnergy, 'Lorry', 'L', RESOURCE_ENERGY, false);
                } else if (upgraderCount < upgraderMax) {
                    spawn.cc(spawnEnergy, 'Upgrader', 'U');		
                } else if (builderCount < builderMax) {
                    spawn.cc(spawnEnergy, 'Builder', 'B');
                } else if (repairerCount < repairerMax) {
                    spawn.cc(spawnEnergy, 'Repairer', 'R');
                } else if (militiaCount < militiaMax) {
                    spawn.cc(spawnEnergy, 'Militia', 'ML');
                } else if (wallRepairerCount < wallRepairerMax) {
                    spawn.cc(spawnEnergy, 'Wallrepairer', 'WR');
                } else if (longDistanceHarvesterCount < longDistanceHarvesterMax) {
                    spawn.cLongDistanceHarvester(
                        spawnEnergy, 
                        'LDHarvester', 
                        'LDH', 
                        config.mainRoom, 
                        config.secondRoom, 
                        config.linkThreeId,
                        config.targetRoomSourceId, 
                        config.targetRoomExitRightX,
                        config.targetRoomExitRightY,
                        config.homeRoomExitRightX,
                        config.homeRoomExitRightY,
                        config.flags.i1,
                    );
                } else if (graveKeeperCount < graveKeeperMax) {
                    spawn.cc(spawnEnergy, 'Gravekeeper', 'GK', true);
                } else if (mineralMinerOneCount < mineralMinerOneMax) {
                    spawn.cMiner(
                        config.minerThreeCost, 
                        'MinMiner', 
                        'MinM', 
                        config.mainRoomMineralId, 
                        config.flags.l4, 
                        config.flags.p3,
                        config.roomMineralType,
                    );
                } else if (mineralLorryOneCount < mineralLorryOneMax) {
                    spawn.cLorry(spawnEnergy, 'MinLorry', 'MinL', config.roomMineralType, true);
                }
                
            } else if (containersOfOne !== null && containersOfTwo !== null) {
                if (minerCount < minerMax) {
                    if (spawnEnergy === SPAWN_ENERGY_CAPACITY) {
                        spawn.cMiner(
                            SPAWN_ENERGY_CAPACITY, 
                            'Miner', 
                            'M', 
                            room.sources[config.mainRoomMainSourceIndex].id, 
                            config.flags.l1, 
                            config.flags.p1,
                            RESOURCE_ENERGY
                        );
                    } else {
                        spawn.cMiner(
                            config.minerOneCost, 
                            'Miner', 
                            'M', 
                            room.sources[config.mainRoomMainSourceIndex].id, 
                            config.flags.l1, 
                            config.flags.p1,
                            RESOURCE_ENERGY
                        );
                    }
                } else if (lorryCount < lorryMax) {
                    spawn.cLorry(spawnEnergy, 'Lorry', 'L', RESOURCE_ENERGY, false);
                } else if (minerTwoCount < minerTwoMax) {
                    if (spawnEnergy === SPAWN_ENERGY_CAPACITY) {
                        spawn.cMiner(
                            SPAWN_ENERGY_CAPACITY, 
                            'Miner2-', 
                            'M2', 
                            room.sources[config.mainRoomSecondSourceIndex].id, 
                            config.flags.l3, 
                            config.flags.p2,
                            RESOURCE_ENERGY
                        );
                    } else {
                        spawn.cMiner(
                            config.minerTwoCost, 
                            'Miner2-', 
                            'M2', 
                            room.sources[config.mainRoomSecondSourceIndex].id, 
                            config.flags.l3, 
                            config.flags.p2,
                            RESOURCE_ENERGY
                        );
                    }
                } else if (lorryTwoCount < lorryTwoMax) {
                    spawn.cLorry(spawnEnergy, 'Lorry2-', 'L2', RESOURCE_ENERGY, false);
                } else if (upgraderCount < upgraderMax) {
                    spawn.cc(spawnEnergy, 'Upgrader', 'U');		
                } else if (builderCount < builderMax) {
                    spawn.cc(spawnEnergy, 'Builder', 'B');
                } else if (repairerCount < repairerMax) {
                    spawn.cc(spawnEnergy, 'Repairer', 'R');
                } else if (militiaCount < militiaMax) {
                    spawn.cc(spawnEnergy, 'Militia', 'ML');
                } else if (wallRepairerCount < wallRepairerMax) {
                    spawn.cc(spawnEnergy, 'Wallrepairer', 'WR');
                } else if (longDistanceHarvesterCount < longDistanceHarvesterMax) {
                    spawn.cLongDistanceHarvester(
                        spawnEnergy, 
                        'LDHarvester', 
                        'LDH', 
                        config.mainRoom, 
                        config.secondRoom, 
                        config.linkThreeId,
                        config.targetRoomSourceId, 
                        config.targetRoomExitRightX,
                        config.targetRoomExitRightY,
                        config.homeRoomExitRightX,
                        config.homeRoomExitRightY,
                        config.flags.i1,
                    );
                } else if (graveKeeperCount < graveKeeperMax) {
                    spawn.cc(spawnEnergy, 'Gravekeeper', 'GK', true);
                } else if (mineralMinerOneCount < mineralMinerOneMax) {
                    // Spawn mineral miner
                    spawn.cMiner(
                        config.minerThreeCost, 
                        'MinMiner', 
                        'MinM', 
                        config.mainRoomMineralId, 
                        config.flags.l4, 
                        config.flags.p3,
                        config.roomMineralType,
                    );
                } else if (mineralLorryOneCount < mineralLorryOneMax) {
                    spawn.cLorry(spawnEnergy, 'MinLorry', 'MinL', config.roomMineralType, true);
                }
            }
        } 
        
    } // End of spawn logic
    let overMinerOneMax = minerCount < minerMax + 1;
    let overMinerTwoMax=  minerTwoCount < minerTwoMax + 1
    return {
        overMinerOneMax, overMinerTwoMax
    };

} // End of function 

function runSpawnTimers(config, minerOne, minerTwo, room, spawn, spawnEnergy, overMinerOneMax, overMinerTwoMax, functions) {
    // Timers
    let count = 0;
    if (minerOne && minerOne.memory && minerOne.memory.spawnTime !== undefined) {
        let minerOneSpawnTime = parseInt(minerOne.memory.spawnTime);
        if (functions.isValidInt(minerOneSpawnTime) && minerOneSpawnTime >= config.minerOneSpawnTime && overMinerOneMax) {
            if (spawnEnergy === SPAWN_ENERGY_CAPACITY) {
                spawn.cMiner(
                    SPAWN_ENERGY_CAPACITY, 
                    'Miner', 
                    'M', 
                    room.sources[config.mainRoomMainSourceIndex].id, 
                    config.flags.l1, 
                    config.flags.p1,
                    RESOURCE_ENERGY
                );
            } else {
                spawn.cMiner(
                    config.minerOneCost, 
                    'Miner', 
                    'M', 
                    room.sources[config.mainRoomMainSourceIndex].id, 
                    config.flags.l1, 
                    config.flags.p1,
                    RESOURCE_ENERGY
                );
            }
        } 
        count = minerOneSpawnTime;
        count++;
        minerOne.memory.spawnTime = count;
        console.log('1: ' + minerOne.memory.spawnTime);
    }
    if (minerTwo && minerTwo.memory && minerTwo.memory.spawnTime !== undefined) {
        let minerTwoSpawnTime = parseInt(minerTwo.memory.spawnTime);
        if (functions.isValidInt(minerTwoSpawnTime) && minerTwoSpawnTime >= config.minerTwoSpawnTime && overMinerTwoMax) {
            if (spawnEnergy === SPAWN_ENERGY_CAPACITY) {
                spawn.cMiner(
                    SPAWN_ENERGY_CAPACITY, 
                    'Miner2-', 
                    'M2', 
                    room.sources[config.mainRoomSecondSourceIndex].id, 
                    config.flags.l3, 
                    config.flags.p2,
                    RESOURCE_ENERGY
                );
            } else {
                spawn.cMiner(
                    config.minerTwoCost, 
                    'Miner2-', 
                    'M2', 
                    room.sources[config.mainRoomSecondSourceIndex].id, 
                    config.flags.l3, 
                    config.flags.p2,
                    RESOURCE_ENERGY
                );
            }
        }
        count = minerTwoSpawnTime;
        count++;
        minerTwo.memory.spawnTime = count;
        console.log('2: ' + minerTwo.memory.spawnTime);
    }
}

module.exports = {
    runSpawnLogic, runSpawnTimers
};