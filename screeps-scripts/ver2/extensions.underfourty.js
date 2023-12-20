var generateCreep = require('prototype.spawncreep');
const HOME = 'E55S43';
const ROOM_RIGHT = 'E56S43';
const ROOM_LEFT = 'E54S43';

// 1300 energy
var roleExtensionsUnderFourty = {
    run: function (){
        generateCreep.run();
        // 9 total
        let minBaseHarvester = 1;
        let minHarvesters = 1;
        let minUpgraders = 2;
        let minBuilders = 1;
        let minRepairers = 1;
        let minMilitia = 1;
        let minWallRepairer = 1;
        let minMiner = 1;
        let minLorry = 2;
        let minLongDistanceHarvesterE56 = 1;
        let minLongDistanceHarvesterE54 = 1;

        let baseHarvesterCount = _.sum(Game.creeps, (c) => c.memory.role == "baseharvester");
        let harvesterCount = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
        let upgraderCount = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
        let builderCount = _.sum(Game.creeps, (c) => c.memory.role == "builder");
	    let repairerCount = _.sum(Game.creeps, (c) => c.memory.role == "repairer");
	    let militiaCount = _.sum(Game.creeps, (c) => c.memory.role == "militia");
        let minerCount = _.sum(Game.creeps, (c) => c.memory.role == "miner");
	    let lorryCount = _.sum(Game.creeps, (c) => c.memory.role == "lorry");
	    let wallRepairerCount = _.sum(Game.creeps, (c) => c.memory.role == "wallrepairer");
	    let longDistanceHarvesterCountE56 = _.sum(Game.creeps, (c) => 
            c.memory.role == "longdistanceharvester" && c.memory.target == ROOM_RIGHT);
	    let longDistanceHarvesterCountE54 = _.sum(Game.creeps, (c) => 
            c.memory.role == "longdistanceharvester" && c.memory.target == ROOM_LEFT);

        let s = Game.spawns["Spawn1"];
        // more speed: builders, repairers
        // generic: harvesters/upgraders
        if (baseHarvesterCount < minBaseHarvester) {
            s.createCustomCreep(1300,`BaseHarvester${Game.time}`,'baseharvester','generic');
		}
		else if (harvesterCount < minHarvesters && minerCount == 0) {
            s.createCustomCreep(1300,`Harvester${Game.time}`,'harvester','generic');
		}
        else if (minerCount < minMiner){
            s.createMiner('5bbcb05e9099fc012e63c0b8', `Miner${Game.time}`, 'miner', 'miner');
        }
        else if (lorryCount < minLorry){
            s.createLorry(600, `Lorry${Game.time}`, 'lorry', 'miner');
        }
		else if (upgraderCount < minUpgraders) {
            s.createCustomCreep(1300,`Upgrader${Game.time}`,'upgrader','generic');
		}
		else if (repairerCount < minRepairers) {
            s.createCustomCreep(1300,`Repairer${Game.time}`,'repairer','morespeed');
		}
        else if (longDistanceHarvesterCountE56 < minLongDistanceHarvesterE56){
            s.createLongDistanceHarvester(1800,`LongDistanceHarvester${Game.time}`,'longdistanceharvester','longdistanceright');
        }
        else if (longDistanceHarvesterCountE54 < minLongDistanceHarvesterE54){
            s.createLongDistanceHarvester(1800,`LongDistanceHarvester${Game.time}`,'longdistanceharvester','longdistanceleft');
        }
		else if (builderCount < minBuilders) {
            s.createCustomCreep(1300,`Builder${Game.time}`,'builder','morespeed');
		}
        else if (militiaCount < minMilitia){
            s.createCustomCreep(1300,`Militia${Game.time}`,'militia','generic');
        }
        else if (wallRepairerCount < minWallRepairer){
            s.createCustomCreep(1300,`WallRepairer${Game.time}`,'wallrepairer','morespeed');
        }
		else {
			if (repairerCount < (minRepairers + 2)){
                s.createCustomCreep(1300,`Repairer${Game.time}`,'repairer','morespeed');
			}
			else if (harvesterCount < (minHarvesters + 1) && minerCount == 0){
                s.createCustomCreep(1300,`Harvester${Game.time}`,'harvester','generic');
			}
			else if (upgraderCount < minUpgraders + 1) {
                s.createCustomCreep(1300,`Upgrader${Game.time}`,'upgrader','generic');
			}
            else if (wallRepairerCount < minWallRepairer + 1){
                s.createCustomCreep(1300,`WallRepairer${Game.time}`,'wallrepairer','morespeed');
            }
			else if (harvesterCount < (minHarvesters + 2) && minerCount == 0){
                s.createCustomCreep(1300,`Harvester${Game.time}`,'harvester','generic');
			}
			else {
                s.createCustomCreep(1300,`Builder${Game.time}`,'builder','morespeed');
			}
		}
    }
}

module.exports = roleExtensionsUnderFourty;