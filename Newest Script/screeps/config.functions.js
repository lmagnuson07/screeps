function getSpawnEnergy(totalCreeps, totalExtensions, creepMin, capacityIndex) {
    let spawnEnergy = SPAWN_ENERGY_CAPACITY;
    let energy = (totalExtensions.length * EXTENSION_ENERGY_CAPACITY[capacityIndex]) + SPAWN_ENERGY_CAPACITY;
    if (totalCreeps >= creepMin) {
        spawnEnergy = energy;
    }
    return spawnEnergy;
}

function roleSwapping_getSpawnEnergy(config, controllerLevel, creeps, rdmCreep, totalCreeps, totalExtensions, harvesterCount, upgraderCount, upgraders, harvesters) {
    // Get spawn energy
    let spawnEnergy = SPAWN_ENERGY_CAPACITY;
    if (totalExtensions.length >= CONTROLLER_STRUCTURES.extension[controllerLevel]) {
        spawnEnergy = getSpawnEnergy(totalCreeps, totalExtensions, config.creepMin, controllerLevel);
    } else {
        // Controller level of 1
        spawnEnergy = getSpawnEnergy(totalCreeps, totalExtensions, config.creepMin, 1);
    }

    // Swap an upgrader for a harvester when there are 0 harvesters, else swap with the youngest creep.
    if (totalExtensions.length <= CONTROLLER_STRUCTURES.extension[config.harvesterRoleSwappingLevel]) {
        if (totalCreeps <= creepMin) {
            if (harvesterCount === 0) {
                if (upgraderCount > 0) {
                    upgraders[0].memory.role = "H";
                } else {
                    if (rdmCreep !== null) {
                        creeps[rdmCreep].memory.role = "H";
                    }
                }
            } else if (lorryCount > 0 && minerCount > 0) {
                harvesters[0].memory.role = "U";
            }
        }
    }
    return spawnEnergy;
}

function isValidInt(value) {
    // Check that the value is not empty, not undefined, and is a number
    const regex = /^(-?[1-9]\d*|0)$/;

    return regex.test(value);
}

module.exports =  { 
    roleSwapping_getSpawnEnergy, isValidInt
};