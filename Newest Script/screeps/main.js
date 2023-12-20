let config = require('./config');
let roomUtils = require('./config.roomUtils');
let counts = require('./config.counts');
let functions = require('./config.functions');

let spawnLogic = require('logic.spawn');

let prototypeRoom = require('prototype.room');
let prototypeSpawn = require('prototype.spawn'); 
let prototypeCreep = require('prototype.creep');

let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleRepairer = require('role.repairer');
let roleMiner = require('role.miner');
let roleLorry = require('role.lorry');
let roleMilitia = require('role.militia');
let roleWallRepairer = require('role.wallrepairer');
let roleLongDistanceHarvester = require('role.longDistanceHarvester');
let roleGravekeeper = require('role.gravekeeper');

let towerScript = require('structure.tower');
let linkScript = require('structure.link');

prototypeRoom.run();
prototypeSpawn.run();
prototypeCreep.run();

module.exports.loop = function () {
    // Game.creeps['LDHarvester78'].memory.homeRoomExitRightX = "49"
    // Game.creeps['LDHarvester78'].memory.homeRoomExitRightY = "34"
	// Setting up variables 
    const MAIN_SPAWN = Game.spawns[config.mainSpawnName];
    const HOME_ROOM = MAIN_SPAWN.room;
    let creeps = Game.creeps;

    let { 
        transferTargets, totalExtensions, constSites, roads, roadsOverMin, 
        towers, emptyTowers, damagedTowers, walls,
        tombstones, droppedResourceEnergy,
        containers, fullContainerOfOne, fullContainerOfTwo, fullContainerOfThree, atCapacityContainerOfThree,
        storageContainers, fullStorageContainers,  
        dmgContainers, dmgContainersOverMin, dmgMineralContainer, dmgMineralContainerOverMin,  
        fullTanks, tanks, 
        links, linkOne, linkTwo, linkThree, fullLinkOne, 
        fullTerminal, terminal
    } = roomUtils.getRoomStructures(HOME_ROOM, config);

    // creeps and counts
    let myCounts = counts.getCounts(creeps);
    let myCreeps = counts.getCreeps(creeps);
    let { hostileCreeps, hostileStructures } = counts.getHostileTargets(HOME_ROOM);
    let rdmCreep = counts.getRandomCreep(creeps);

    // Scripts
    if (hostileCreeps.length > 0 || hostileStructures.length > 0) {
        towerScript.run(towers);
    }
    if (linkOne) {
        if (linkOne.store.getFreeCapacity(RESOURCE_ENERGY) === linkOne.store.getCapacity(RESOURCE_ENERGY)) {
            linkScript.run(links, config.minLinkEnergy);
        } 
    }
    if (linkTwo) {
        if (linkTwo.store.getFreeCapacity(RESOURCE_ENERGY) === linkTwo.store.getCapacity(RESOURCE_ENERGY)) {
            linkScript.run(links, config.minLinkEnergy);
        }
    }
    // console.log(fullTerminal)
    // console.log(terminal)
    // Gets spawn energy and swaps roles
    spawnEnergy = functions.roleSwapping_getSpawnEnergy(
        config, 
        HOME_ROOM.controller.level, 
        creeps, 
        rdmCreep, 
        myCounts.totalCreeps, 
        totalExtensions, 
        myCounts.harvesterCount, 
        myCounts.upgraderCount, 
        myCreeps.upgraders, 
        myCreeps.harvesters
    );
    
    // Spawn logic
    let {
        overMinerOneMax, overMinerTwoMax
    } = spawnLogic.runSpawnLogic(config, myCounts, HOME_ROOM, MAIN_SPAWN, spawnEnergy, containers[0], containers[1]);

    // Timers
    spawnLogic.runSpawnTimers(config, myCreeps.minerOne, myCreeps.minerTwo, HOME_ROOM, MAIN_SPAWN, spawnEnergy, overMinerOneMax, overMinerTwoMax, functions);
    
    new RoomVisual(HOME_ROOM.name).text("Area 1", 28, 45, {color: 'white', font: 0.7}); 
    new RoomVisual(HOME_ROOM.name).text("Area 2", 6, 21, {color: 'white', font: 0.7}); 
    new RoomVisual(HOME_ROOM.name).text("Area 3", 40, 3, {color: 'white', font: 0.7}); 
    // new RoomVisual('W5N1').circle(10,20).line(0,0,10,20);
    
    // Run creeps roles
    let creepArgs = {
        // vars
        creep: null,                                room: HOME_ROOM,
        config: config, 
        // lists
        transferTargets: transferTargets,           constSites: constSites, 
        roads: roads,                               roadsOverMin: roadsOverMin,
        towers: towers,                             emptyTowers: emptyTowers,
        damagedTowers: damagedTowers,               walls: walls,
        // gravekeeper
        tombstones: tombstones,                     droppedResourceEnergy: droppedResourceEnergy,
        // containers
        containers: containers, 
        fullContainerOfOne: fullContainerOfOne,     fullContainerOfTwo: fullContainerOfTwo,
        fullContainerOfThree,                       atCapacityContainerOfThree: atCapacityContainerOfThree,
        storageContainers: storageContainers,       fullStorageContainers: fullStorageContainers,                               
        dmgContainers: dmgContainers,               dmgContainersOverMin: dmgContainersOverMin,
        dmgMineralContainer: dmgMineralContainer,   dmgMineralContainerOverMin: dmgMineralContainerOverMin,    
        tanks: tanks,                               fullTanks: fullTanks,
        // links
        linkOne: linkOne,                           linkTwo: linkTwo,
        fullLinkOne: fullLinkOne,             
        // terminal
        fullTerminal, terminal,
        // other    
        lorriesOne: myCreeps.lorriesOne,            
    };
	for (const name in Game.creeps) {
		const creep = Game.creeps[name];
        creepArgs.creep = creep;

        // Hierarchy roles
        if (creep.memory.role === "GK") {
            roleGravekeeper.run(creepArgs);
        }
        if (creep.memory.role === "ML") {
            roleMilitia.run(creepArgs);
        }
        if (creep.memory.role === "B") {
            roleBuilder.run(creepArgs);
        }
        if (creep.memory.role === "R") {
            roleRepairer.run(creepArgs);
        }
        if (creep.memory.role === "WR") {
            roleWallRepairer.run(creepArgs);
        }
		if (creep.memory.role === "H") {
			roleHarvester.run(creepArgs);
		}
		if (creep.memory.role === "U") {
			roleUpgrader.run(creepArgs);
		}
    
        // Special roles
        if (creep.memory.role === "M") {
            creepArgs.minerContainer = containers[config.areaOneIndex];
            roleMiner.run(creepArgs);
        }
        if (creep.memory.role === "M2") {
            creepArgs.minerContainer = containers[config.areaTwoIndex];
            roleMiner.run(creepArgs);
        }
        if (creep.memory.role === "L") {
            creepArgs.lorryContainer = fullContainerOfOne;
            roleLorry.run(creepArgs);
        }
        if (creep.memory.role === "L2") {
            creepArgs.lorryContainer = fullContainerOfTwo;
            roleLorry.run(creepArgs);
        }
        if (creep.memory.role === "MinM") {
            creepArgs.minerContainer = containers[config.areaThreeIndex];
            roleMiner.run(creepArgs);
        }
        if (creep.memory.role === "MinL") {
            // creepArgs.lorryContainer = fullContainerOfThree;
            roleLorry.run(creepArgs);
        }
        if (creep.memory.role === "LDH") {
            roleLongDistanceHarvester.run(creepArgs);
        }
	}

};
