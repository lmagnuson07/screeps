var towerScript = require('towers');
var generateCreep = require('prototype.spawncreep');
var roleExtensionsUnderFive = require('extensions.underfive');
var roleExtensionsUnderTen = require('extensions.underten');
var roleExtensionsUnderTwenty = require('extensions.undertwenty');
var roleExtensionsUnderThirty = require('extensions.underthirty');
var roleExtensionsUnderFourty = require('extensions.underfourty');

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMilitia = require('role.militia');
var roleMiner = require('role.miner');
var roleLorry = require('role.lorry');
var roleWallRepairer = require('role.wallrepairer');
var roleBaseHarvester = require('role.baseharvester');
var roleLongDistanceHarvester = require('role.longdistanceharvester');

const HOME = 'E55S43';
const ROOM_RIGHT = 'E56S43';
const ROOM_LEFT = 'E54S43';

module.exports.loop = function () {
	towerScript.run();
	generateCreep.run();
	// accessing a specific creaps memory 
	//Game.creeps["Bill"].memory.harvesting = true;
	//Game.creeps["LongDistanceHarvester40428799"].memory.role = "longdistanceharvester";
	//Game.creeps["Emily"].memory.role = "harvester";
	//console.log(Object.keys(Game.structures).length);

	// clear memory
	for (let name in Memory.creeps){
		if (!Game.creeps[name]){
			delete Memory.creeps[name];
		}
	}

	// gets the last creep spawned (youngest). Ensures it is not a longdistanceharvester
	let rdmCreep;
	if (Object.keys(mainRoomCreeps).length > 0){
		let mainRoomCreeps = _.filter(Game.creeps, (c) => 
			c.memory.role !== "longdistanceharvester" && c.memory.role !== "miner" && c.memory.role !== "lorry");
		rdmCreep = mainRoomCreeps[Object.keys(mainRoomCreeps).length - 1].name;
	}
	
	if (rdmCreep != undefined){
		var sources = Game.creeps[rdmCreep].room.find(FIND_SOURCES);
		//var activeSources = Game.creeps[rdmCreep].room.find(FIND_SOURCES_ACTIVE);

		var structures = Game.creeps[rdmCreep].room.find(FIND_STRUCTURES, {
			filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
		});
		structures.sort((a,b) => a.hits - b.hits);

		var extensions = Game.creeps[rdmCreep].room.find(FIND_STRUCTURES, {
			filter: (s) => s.structureType === STRUCTURE_EXTENSION &&
			s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
		});

		var totalExtensions = Game.creeps[rdmCreep].room.find(FIND_STRUCTURES, {
			filter: (s) => s.structureType == STRUCTURE_EXTENSION
		})

		var damagedTowers = Game.creeps[rdmCreep].room.find(FIND_MY_STRUCTURES, {
			filter: (structure) => {
				return structure.structureType == STRUCTURE_TOWER &&
				structure.hits < structure.hitsMax;
			}
		});
		let containers = Game.creeps[rdmCreep].room.find(FIND_MY_STRUCTURES, {
			filter: (s) => {
				return (s.structureType == STRUCTURE_CONTAINER && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
			}
		});
		// console.log('wow' + containers.length)
		// console.log(`Damaged towers: ${damagedTowers.length}`);
		// console.log(`Source0 energy: ${sources[0].energy}`);
		// console.log(`Source1 energy: ${sources[1].energy}`);
		// console.log(`Damaged structures: ${structures}`);
		// console.log(`Total extensions: ${totalExtensions.length}`);
		// console.log(`Empty extensions: ${extensions.length}`)
	}

	//let harvesters = _(Game.creeps).filter( {memory: {role: 'harvester'}});
	let baseHarvesterCount = _.sum(Game.creeps, (c) => c.memory.role == "baseharvester");
	let harvesterCount = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
	let upgraderCount = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
	let builderCount = _.sum(Game.creeps, (c) => c.memory.role == "builder");
	let repairerCount = _.sum(Game.creeps, (c) => c.memory.role == "repairer");
	let militiaCount = _.sum(Game.creeps, (c) => c.memory.role == "militia");
	let minerCount = _.sum(Game.creeps, (c) => c.memory.role == "miner");
	let lorryCount = _.sum(Game.creeps, (c) => c.memory.role == "lorry");
	let wallRepairerCount = _.sum(Game.creeps, (c) => c.memory.role == "wallrepairer");
	let longDistanceHarvesterCount = _.sum(Game.creeps, (c) => c.memory.role == "longdistanceharvester");

	//console.log(Game.getObjectById("5bbcb05e9099fc012e63c0b7").energy)
	//console.log(Game.getObjectById("5bbcb05e9099fc012e63c0b8").energy)
	
	// console.log(`Num creeps ${Object.keys(Game.creeps).length}`)
	// console.log(`BaseHarvesters: ${baseHarvesterCount}`);
	// console.log(`Harvesters: ${harvesterCount}`);
	// console.log(`Upgraders: ${upgraderCount}`);
	// console.log(`Builders: ${builderCount}`);
	// console.log(`Repaiers: ${repairerCount}`);
	// console.log(`Militia: ${militiaCount}`);
	// console.log(`Miner: ${minerCount}`);
	// console.log(`Lorry: ${lorryCount}`);
	// console.log(`Wall Repairer: ${wallRepairerCount}`);
	// console.log(`Long Distance Harvesters: ${longDistanceHarvesterCount}`);

	// perform creep role actions
	for (const name in Game.creeps) {
		let sourcesIndex = 0;
		const creep = Game.creeps[name];

		if (creep.memory.role == "baseharvester"){
			sourcesIndex = 0;
			roleBaseHarvester.run(creep,sourcesIndex);
		}
		if (creep.memory.role == "harvester"){
			sourcesIndex = 1;
			roleHarvester.run(creep,sourcesIndex);
		}
		if (creep.memory.role == "upgrader"){
			sourcesIndex = 0;
			roleUpgrader.run(creep,sourcesIndex);
		}
		if (creep.memory.role == "builder"){
			sourcesIndex = 1;
			roleBuilder.run(creep,sourcesIndex);
		}
		if (creep.memory.role == "repairer"){
			sourcesIndex = 1;
			roleRepairer.run(creep,sourcesIndex);
		}
		if (creep.memory.role == "militia"){
			sourcesIndex = 0;
			roleMilitia.run(creep,sourcesIndex);
		}
		if (creep.memory.role == "wallrepairer"){
			sourcesIndex = 1;
			roleWallRepairer.run(creep,sourcesIndex);
		}
		if (creep.memory.role == "longdistanceharvester"){
			roleLongDistanceHarvester.run(creep);
		}
		if (creep.memory.role == "miner"){
			roleMiner.run(creep);
		}
		if (creep.memory.role == "lorry"){
			roleLorry.run(creep);
		}
	}

	
	/////////////////// automation of scripts////////////////////////////
	// ensure that we always have a baseharvester if we at least have creeps.
	let s = Game.spawns["Spawn1"];
	if (baseHarvesterCount == 0 && Object.keys(Game.creeps).length !== 0){
		let genericCreeps = _.filter(Game.creeps, {memory: {parts: 'generic'}});
		let numGenericCreeps = Object.keys(genericCreeps).length;
		if (numGenericCreeps > 0){
			rdmCreep = genericCreeps[numGenericCreeps - 1].name;
			Game.creeps[rdmCreep].memory.role = "baseharvester";
		}
		else {
	 		Game.creeps[rdmCreep].memory.role = "baseharvester";
		}
	}

	let roomSources = s.room.find(FIND_SOURCES);
	let bSources = false;
	for (let source of roomSources){
		// will only be true if there is no miners. 
		let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
			filter: s => s.structureType == STRUCTURE_CONTAINER
		});
		// if we have 0 containers in the room
		if (containers.length == 0){
			bSources = true;
		}
	}

	if (!bSources){
		// if we dont have harvesters, we have a baseharvester and we at least 2 creeps.
		// since we would have just assigned the baseharvester, we grab the next element at an index of -2. 
		if (baseHarvesterCount > 0 && harvesterCount == 0 && Object.keys(Game.creeps).length >= 2){
			let genericCreeps = _.filter(Game.creeps, (c) => c.memory.parts == "generic" && c.memory.role !== "baseharvester");
			let numGenericCreeps = Object.keys(genericCreeps).length;
			if (numGenericCreeps > 0){
				rdmCreep = genericCreeps[numGenericCreeps - 1].name;
				Game.creeps[rdmCreep].memory.role= "harvester";
			}
			else {
				rdmCreep = Object.keys(Game.creeps)[Object.keys(Game.creeps).length - 2];
				Game.creeps[rdmCreep].memory.role = "harvester";
			}
		}
	}

	// 4 creeps or less
	if (Object.keys(Game.creeps).length < 5){
		// no creeps left.
		if (Object.keys(Game.creeps).length == 0){
			Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], `BaseHarvester${Game.time}`, {memory: {role: 'baseharvester'}});
		}
		// will always have a baseharvester here. Goes here until we have 3 creeps in total (makes 2 harvesters)
		else {
			Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], `Harvester${Game.time}`, {memory: {role: 'harvester'}});
		}
	}
	else {
		let creepsInRoom = s.room.find(FIND_MY_CREEPS);
		// no miners
		if (minerCount == 0){
			roomSources = s.room.find(FIND_SOURCES);
			for (let source of roomSources){
				// will only be true if there is no miners. 
				if (!_.some(creepsInRoom, c => c.memory.role == 'miner' && c.memory.sourceId == source.id)){
					//let adjacent = s.room.lookForAtArea(FIND_STRUCTURES, ) - better for performance
					// will only be true once we add a container next to a source
					let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
						filter: s => s.structureType == STRUCTURE_CONTAINER
					});
					if (containers.length > 0){
						s.createMiner('5bbcb05e9099fc012e63c0b8', `Miner${Game.time}`, 'miner', 'miner');
					}
				}
			}
		}
		
		// no lories but we have a miner. Will only run if we have 0 lorries.
		if (minerCount > 0 && lorryCount == 0){
			s.createLorry(300, `Lorry${Game.time}`, 'lorry', 'miner');
		}
	}

	if (rdmCreep != undefined){
		if (totalExtensions.length < 5){
			// 300 energy
			roleExtensionsUnderFive.run();
		}
		else if (totalExtensions.length < 10){
			// 550 energy
			roleExtensionsUnderTen.run();
		}
		else if (totalExtensions.length < 20){
			// 800 energy
			roleExtensionsUnderTwenty.run();
		}
		else if (totalExtensions.length < 30){
			// 1300 energy
			roleExtensionsUnderThirty.run();
		}
		else if (totalExtensions.length < 40){
			// 1800 energy
			roleExtensionsUnderFourty.run();
		}
	}
	
};