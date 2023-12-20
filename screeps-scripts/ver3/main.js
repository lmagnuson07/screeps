let prototypeSpawn = require('prototype.spawn');
let prototypeRoom = require('prototype.room');

let creepGenerate = require('creep.generate');

let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleRepairer = require('role.builder');
let roleMiner = require('role.miner');

prototypeSpawn.run();
prototypeRoom.run();

module.exports.loop = function () {
	// Game.creeps['H45035471'].memory.role = 'U';
	// setting up variables 
	let room = Game.spawns['Spawn1'].room;
	let transferTargets = room.find(FIND_MY_STRUCTURES, {
		filter: (structure) => {
			return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
				structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
		}
	});
	let targets = room.find(FIND_CONSTRUCTION_SITES);
	console.log(targets)
	let totalExtensions = room.find(FIND_STRUCTURES, {
		filter: (s) => s.structureType == STRUCTURE_EXTENSION
	})
	let structures = room.find(FIND_STRUCTURES, {
		filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
	});
	structures.sort((a,b) => a.hits - b.hits);
	let sourceOneContainers = room.sources[1].pos.findInRange(FIND_STRUCTURES, 2, {
		filter: s => s.structureType == STRUCTURE_CONTAINER && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
	});

	console.log("Containers: " + sourceOneContainers)
	let hasConstructionSites = targets.length > 0;
	let hasRepairStructures = structures.length > 0;
	let hasSourceOneContainers = sourceOneContainers.length > 0;
	// counting creeps 
	let totalCreeps = Object.keys(Game.creeps).length;
	let harvesterCount = _.sum(Game.creeps, (c) => c.memory.role == "H");
	let upgraderCount = _.sum(Game.creeps, (c) => c.memory.role == "U");
	let builderCount = _.sum(Game.creeps, (c) => c.memory.role == "B");
	let repairerCount = _.sum(Game.creeps, (c) => c.memory.role == "R");
	let minerCount = _.sum(Game.creeps, (c) => c.memory.role == "M");

	// print creep counts
	console.log(`Creeps: ${totalCreeps}`);
	console.log(`Harvesters: ${harvesterCount}`);
	console.log(`Upgrader: ${upgraderCount}`);
	console.log(`Builder: ${builderCount}`);
	console.log(`Repairer: ${repairerCount}`);
	console.log(`Miner: ${minerCount}`);
	// console.log(JSON.stringify(Game))
	
	// Spawn logic
	let creepMax = 16;
	let harvesterMax = 3;
	let builderMax = 4;
	let upgraderMax = 3;
	let repairerMax = 2;
	let minerMax = 1;
	let harvesterLimit = harvesterCount < harvesterMax;
	let builderLimit = hasConstructionSites ? builderCount < builderMax : false;
	let upgraderLimit = upgraderCount < upgraderMax;
	let repairerLimit = repairerCount < repairerMax;
	let minerLimit = minerCount < minerMax;

	//let harvesters = _.filter(Game.creeps, {memory: {role: 'H'}});
	let upgraders = _.filter(Game.creeps, {memory: {role: 'U'}});
	let builders = _.filter(Game.creeps, {memory: {role: 'B'}});
	let repairers = _.filter(Game.creeps, {memory: {role: 'R'}});
	let miners = _.filter(Game.creeps, {memory: {role: 'M'}});

	let countArray = {
		"hLimit": harvesterLimit,
		"uLimit": upgraderLimit,
		"bLimit": builderLimit,
		"rLimit": repairerLimit,
		"mLimit": minerLimit,
		"hasConstSite": hasConstructionSites,
		"hasRepairSite": hasRepairStructures,
		"hasSource1Cont": hasSourceOneContainers
	};

	// 16 creeps max
	if (totalCreeps < creepMax) {
		creepGenerate.run(totalCreeps, totalExtensions, countArray);
	}

	// Role swapping
	if (harvesterLimit || builderLimit || upgraderLimit || repairerLimit || minerLimit) {
		console.log(harvesterLimit, builderLimit, upgraderLimit, repairerLimit)
		// always need one harvester 
		if (harvesterCount <= 1 && totalCreeps > 0) {
			Game.creeps[totalCreeps - 1].memory.role = 'H'; // Get the youngest creep
		} else {
			if (hasConstructionSites){
				if (builderLimit && upgraderCount > upgraderMax +1) {
					if (upgraders.length > 0){
						upgraders[upgraderCount - 1].memory.role = 'B';
					}
				} 
			}
			if (hasRepairStructures) {
				if (repairerLimit && upgraderCount > upgraderMax +1) {
					if (upgraders.length > 0){
						upgraders[upgraderCount - 1].memory.role = 'R';
					}
				} 
			}
			if (harvesterLimit && upgraderCount > upgraderMax +1) {
				if (upgraders.length > 0) {
					upgraders[upgraderCount - 1].memory.role = 'H';
				}
			} 
		}
	}

	// Remove builder roles when we don't have construction sites
	if (!hasConstructionSites && builderCount > 0) {
		builders.forEach(builder => {
			builder.memory.role = 'U';
		});
	}
	// Remove repairer roles when we don't have repair sites
	if (!hasRepairStructures && repairerCount > 0) {
		repairers.forEach(repairer => {
			repairer.memory.role = 'U';
		});
	}
	// Remove miner role when we dont have containers for source one
	if (!hasSourceOneContainers && minerCount > 0) {
		miners.forEach(miner => {
			miner.memory.role = 'U';
		});
	}

	// Role actions
	for (const name in Game.creeps) {
		const creep = Game.creeps[name];

		if (creep.memory.role == "H") {
			roleHarvester.run(creep, transferTargets, room); // room is needed for sources
		}
		if (creep.memory.role == "U") {
			roleUpgrader.run(creep, room); // room is needed for sources
		}
		if (creep.memory.role == "B") {
			roleBuilder.run(creep, targets, room);
		}
		if (creep.memory.role == "R") {
			roleRepairer.run(creep, structures, room);
		}
		if (creep.memory.role == "M") {
			roleMiner.run(creep, sourceOneContainers, room);
		}
	}
};
