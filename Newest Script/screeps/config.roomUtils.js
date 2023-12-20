function getRoomStructures(room, config) {
    ///////////// Targets ///////////////////////////
    // Extensions and spawns
    let transferTargets = room.find(FIND_MY_STRUCTURES, {
		filter: (structure) => {
			return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
				structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
		}
    });
    transferTargets.sort((a, b) => b.id.localeCompare(a.id));
    let totalExtensions = room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    });
    // Construction sites
    let constSites = room.find(FIND_CONSTRUCTION_SITES);
    constSites.sort((a, b) => b.progress - a.progress);
    // Roads
    let roads = room.find(FIND_STRUCTURES, {
		filter: (s) => s.hits < s.hitsMax && s.structureType === STRUCTURE_ROAD
	});
    let roadsOverMin = room.find(FIND_STRUCTURES, {
		filter: (s) => s.hits < config.maxRoadHits && s.structureType === STRUCTURE_ROAD
	});
    // Towers
    let towers = room.find(FIND_STRUCTURES, {
        filter: (structure) => structure.structureType === STRUCTURE_TOWER
    });
    let emptyTowers = room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    let damagedTowers = room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER &&
            structure.hits < structure.hitsMax;
        }
    });
    // Walls and ramparts
    let walls = room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_WALL && 
            s.hits <= config.wallMaxHealth
    });
    // Gravekeeper Targets
    let tombstones = room.find(FIND_TOMBSTONES, {
        filter: (tombstone) => {
            return tombstone.store.getUsedCapacity() > config.maxDroppedResourceAmount;
        }
    });
    tombstones.sort((a, b) => a.ticksToDecay - b.ticksToDecay);
    let droppedResourceEnergy = room.find(FIND_DROPPED_RESOURCES, {
        filter: (resource) => {
            return resource.resourceType === RESOURCE_ENERGY && resource.amount >= config.maxDroppedResourceAmount
        }
    });
    ////////////// Containers /////////////////////////
    let containers = [
        Game.getObjectById(config.containerOfOneId),
        Game.getObjectById(config.containerOfTwoId),
        Game.getObjectById(config.containerOfThreeId),
    ]
    // Omits empty mining containers (for creeps that pull from storage containers first)
    let fullContainerOfOne = null;
    if (containers[config.areaOneIndex]) {
        if (containers[config.areaOneIndex].store.getFreeCapacity(RESOURCE_ENERGY) !== containers[config.areaOneIndex].store.getCapacity(RESOURCE_ENERGY)) {
            fullContainerOfOne = containers[config.areaOneIndex];
        }
    }
    let fullContainerOfTwo = null;
    if (containers[config.areaTwoIndex]) {
        if (containers[config.areaTwoIndex].store.getFreeCapacity(RESOURCE_ENERGY) !== containers[config.areaTwoIndex].store.getCapacity(RESOURCE_ENERGY)) {
            fullContainerOfTwo = containers[config.areaTwoIndex];
        }
    }
    let fullContainerOfThree = null;
    if (containers[config.areaThreeIndex]) {
        if (containers[config.areaThreeIndex].store.getFreeCapacity(config.roomMineralType) !== containers[config.areaThreeIndex].store.getCapacity(config.roomMineralType)) {
            fullContainerOfThree = containers[config.areaThreeIndex];
        }
    }
    let atCapacityContainerOfThree = null;
    if (containers[config.areaThreeIndex]) {
        if (containers[config.areaThreeIndex].store.getUsedCapacity(config.roomMineralType) === containers[config.areaThreeIndex].store.getCapacity(config.roomMineralType) - config.mineralContainerCapacityOffset) {
            atCapacityContainerOfThree = containers[config.areaThreeIndex];
        }
    }
    //------ Stoarge Containers -----//
    let allStorageContainers = [
        Game.getObjectById(config.storageContainerOneId),
        Game.getObjectById(config.storageContainerTwoId),
    ];
    let fullStorageContainers = [];
    allStorageContainers.forEach((container) => {
        if (container.store.getFreeCapacity(RESOURCE_ENERGY) !== container.store.getCapacity(RESOURCE_ENERGY)) {
            fullStorageContainers.push(container);
        }
    });
    // Omits full storage containers (for lorries filling the containers)
    let storageContainers = [];
    allStorageContainers.forEach((container) => {
        if (container.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            storageContainers.push(container);
        }
    });
    //------ Damaged Containers -----//
    let dmgContainers = room.find(FIND_STRUCTURES, {
        filter: (s) => s.hits < s.hitsMax && s.structureType === STRUCTURE_CONTAINER && s.id !== config.containerOfTwoId && s.id !== config.containerOfThreeId
    });
    let dmgContainersOverMin = room.find(FIND_STRUCTURES, {
        filter: (s) => s.hits < config.containerMinHits && s.structureType === STRUCTURE_CONTAINER && s.id !== config.containerOfTwoId && s.id !== config.containerOfThreeId
    });
    let dmgMineralContainer = room.find(FIND_STRUCTURES, {
        filter: (s) => s.hits < s.hitsMax && s.structureType === STRUCTURE_CONTAINER && s.id === config.containerOfThreeId
    });
    let dmgMineralContainerOverMin = room.find(FIND_STRUCTURES, {
        filter: (s) => s.hits < config.mineralContainerMinHits && s.structureType === STRUCTURE_CONTAINER && s.id === config.containerOfThreeId
    });
    // Tanks
    let fullTanks = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType === STRUCTURE_STORAGE &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) !== structure.store.getCapacity(RESOURCE_ENERGY);
        }
    });
    let tanks = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType === STRUCTURE_STORAGE &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    //////////////// Links ///////////////////////
    let linkOne = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType === STRUCTURE_LINK && structure.id === config.linkOneId 
                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    })[0];
    let linkTwo = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType === STRUCTURE_LINK && structure.id === config.linkTwoId 
                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    })[0];
    let linkThree = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType === STRUCTURE_LINK && structure.id === config.linkThreeId 
                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    })[0];
    let links = [Game.getObjectById(config.linkOneId), Game.getObjectById(config.linkTwoId), Game.getObjectById(config.linkThreeId)];
    let fullLinkOne = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_LINK && structure.id === config.linkOneId 
                && structure.store.getFreeCapacity(RESOURCE_ENERGY) !== structure.store.getCapacity(RESOURCE_ENERGY);
        }
    })[0];
    /////////// Terminals //////////////////////////
    let fullTerminal = null;
    let terminal = null;
    if (room.terminal) {
        // Omits full storage Terminals (for lorries filling the Terminals)
        if (room.terminal.store.getFreeCapacity() > 0) {
            terminal = room.terminal;
        }
        if (room.terminal.store.getFreeCapacity() !== room.terminal.store.getCapacity()) {
            fullTerminal = room.terminal;
        }
    }

    return { 
        transferTargets, totalExtensions, constSites, roads, roadsOverMin, 
        towers, emptyTowers, damagedTowers, walls,
        tombstones, droppedResourceEnergy,
        containers, fullContainerOfOne, fullContainerOfTwo, fullContainerOfThree, atCapacityContainerOfThree,
        storageContainers, fullStorageContainers,  
        dmgContainers, dmgContainersOverMin, dmgMineralContainer, dmgMineralContainerOverMin, 
        fullTanks, tanks, 
        links, linkOne, linkTwo, linkThree, fullLinkOne, 
        fullTerminal, terminal
    };
}
module.exports =  { 
    getRoomStructures,
};