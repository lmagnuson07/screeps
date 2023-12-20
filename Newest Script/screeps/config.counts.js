function getCounts(creeps) {
    let totalCreeps = Object.keys(creeps).length;
	let harvesterCount = _.sum(creeps, (c) => c.memory.role == "H");
	let upgraderCount = _.sum(creeps, (c) => c.memory.role == "U");
	let builderCount = _.sum(creeps, (c) => c.memory.role == "B");
	let repairerCount = _.sum(creeps, (c) => c.memory.role == "R");
	let minerCount = _.sum(creeps, (c) => c.memory.role == "M");
	let minerTwoCount = _.sum(creeps, (c) => c.memory.role == "M2");
	let mineralMinerOneCount = _.sum(creeps, (c) => c.memory.role == "MinM");
	let lorryCount = _.sum(creeps, (c) => c.memory.role == "L");
	let lorryTwoCount = _.sum(creeps, (c) => c.memory.role == "L2");
	let mineralLorryOneCount = _.sum(creeps, (c) => c.memory.role == "MinL");
	let militiaCount = _.sum(creeps, (c) => c.memory.role == "ML");
	let wallRepairerCount = _.sum(creeps, (c) => c.memory.role == "WR");
	let longDistanceHarvesterCount = _.sum(creeps, (c) => c.memory.role == "LDH");
	let graveKeeperCount = _.sum(creeps, (c) => c.memory.role == "GK");

    return {
    	totalCreeps, harvesterCount, upgraderCount, 
        builderCount,repairerCount, minerCount, minerTwoCount,
        lorryCount, lorryTwoCount, militiaCount, wallRepairerCount, 
		mineralMinerOneCount, mineralLorryOneCount,
		longDistanceHarvesterCount, graveKeeperCount
    }; 
}

function getCreeps(creeps) {
    let upgraders = _.filter(creeps, (creep) => (creep.memory.role == 'U' || creep.memory.role == 'UH'));
	let harvesters = _.filter(creeps, {memory: {role: 'H'}});
	let lorriesOne = _.filter(creeps, {memory: {role: 'L'}});
	lorriesOne = _.sortBy(lorriesOne, 'name');
	let minerOne = _.filter(creeps, {memory: {role: 'M'}});
    minerOne = minerOne.sort((a, b) => b.ticksToLive - a.ticksToLive)[0];
	let minerTwo = _.filter(creeps, {memory: {role: 'M2'}});
    minerTwo = minerTwo.sort((a, b) => b.ticksToLive - a.ticksToLive)[0];

    return {
        upgraders, harvesters, minerOne, minerTwo, lorriesOne
    };  
}

function getHostileTargets(room) {
	let hostileCreeps = room.find(FIND_HOSTILE_CREEPS);
	let hostileStructures = room.find(FIND_HOSTILE_STRUCTURES);
	
	return {
		hostileCreeps, hostileStructures
	};
}

// gets the last creep spawned (youngest). Ensures it is not a longdistanceharvester, miner, lorry.
function getRandomCreep(creeps) {
	let rdmCreep = null;
	if (Object.keys(creeps).length > 0){
		let mainRoomCreeps = _.filter(creeps, (c) => 
			c.memory.role !== "LDH" 
            && c.memory.role !== "M" && c.memory.role !== "M2"
            && c.memory.role !== "L" && c.memory.role !== "L2"
			&& c.memory.role !== "MinM" && c.memory.role !== "MinL"
        );
		if (mainRoomCreeps) {
			if (mainRoomCreeps.length > 0) {
				mainRoomCreeps = mainRoomCreeps.sort((a, b) => b.ticksToLive - a.ticksToLive);
				rdmCreep = mainRoomCreeps[0];
			}
		}
	}
    return rdmCreep.name;
}

module.exports =  { 
    getCounts, getCreeps, getHostileTargets, getRandomCreep
};