let prototypeRoom = require('prototype.room');
let prototypeSpawn = require('prototype.spawn'); 

let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');

prototypeRoom.run();
prototypeSpawn.run();

module.exports.loop = function () {
	// Setting up variables 
	let room = Game.spawns['Spawn1'].room;
	let constSites = room.find(FIND_CONSTRUCTION_SITES);
	let transferTargets = room.find(FIND_MY_STRUCTURES, {
		filter: (structure) => {
			return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
				structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
		}
	});

	// Counting Creeps 
	let totalCreeps = Object.keys(Game.creeps).length;
	let harvesterCount = _.sum(Game.creeps, (c) => c.memory.role == "H");
	let upgraderCount = _.sum(Game.creeps, (c) => c.memory.role == "U");

	// Print Creep Counts
	console.log(`Creeps: ${totalCreeps}`);
	console.log(`Harvesters: ${harvesterCount}`);
	console.log(`Upgrader: ${upgraderCount}`);
	// Spawn Logic
	let creepMax = 8;
	let harvesterMax = 3;
	let upgraderMax = 3;

	if (totalCreeps < creepMax) {
		if (harvesterCount < harvesterMax) {
			Game.spawns['Spawn1'].cc(300, 'Harvester', 'H');
		}
		if (upgraderCount < upgraderMax) {
			Game.spawns['Spawn1'].cc(300, 'Upgrader', 'U');		}	
	}

	// Role Actions
	for (const name in Game.creeps) {
		const creep = Game.creeps[name];

		if (creep.memory.role === "H") {
			roleHarvester.run(creep, transferTargets, room);
		}
		if (creep.memory.role === "U") {
			roleUpgrader.run(creep, room);
		}
	}

};
