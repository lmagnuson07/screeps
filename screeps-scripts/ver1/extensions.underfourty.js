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
        let minLongDistanceHarvesterE56 = 1;
        let minLongDistanceHarvesterE54 = 1;

        let baseHarvesterCount = _.sum(Game.creeps, (c) => c.memory.role == "baseharvester");
        let harvesterCount = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
        let upgraderCount = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
        let builderCount = _.sum(Game.creeps, (c) => c.memory.role == "builder");
	    let repairerCount = _.sum(Game.creeps, (c) => c.memory.role == "repairer");
	    let militiaCount = _.sum(Game.creeps, (c) => c.memory.role == "militia");
	    let wallRepairerCount = _.sum(Game.creeps, (c) => c.memory.role == "wallrepairer");
	    let longDistanceHarvesterCountE56 = _.sum(Game.creeps, (c) => 
            c.memory.role == "longdistanceharvester" && c.memory.target == ROOM_RIGHT);
	    let longDistanceHarvesterCountE54 = _.sum(Game.creeps, (c) => 
            c.memory.role == "longdistanceharvester" && c.memory.target == ROOM_LEFT);

        let s = Game.spawns["Spawn1"];
        let sources = s.room.find(FIND_SOURCES);
        let creepsInRoom = s.room.find(FIND_MY_CREEPS);
        for (let source of sources){
            // will only be true if there is no miners. 
            if (!_.some(creepsInRoom, c => c.memory.role == 'minor' && c.memory.sourceId == source.id)){
                console.log(!_.some(creepsInRoom, c => c.memory.role == 'minor' && c.memory.sourceId == source.id))
                //let adjacent = s.room.lookForAtArea(FIND_STRUCTURES, ) - better for performance
                // will only be true once we add a container next to a source
                let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                });
                console.log(containers.length)
                if (containers.length > 0){
                    //sourceId,name,role,partsOption
                    s.createMiner();
                }
            }
        }
        // more speed: builders, repairers
        // generic: harvesters/upgraders
        if (baseHarvesterCount < minBaseHarvester) {
            s.createCustomCreep(1300,`BaseHarvester${Game.time}`,'baseharvester','generic');
		}
		else if (harvesterCount < minHarvesters) {
            s.createCustomCreep(1300,`Harvester${Game.time}`,'harvester','generic');
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
			if (repairerCount < (minRepairers + 1)){
                s.createCustomCreep(1300,`Repairer${Game.time}`,'repairer','morespeed');
			}
			else if (wallRepairerCount < minWallRepairer + 1){
                s.createCustomCreep(1300,`WallRepairer${Game.time}`,'wallrepairer','morespeed');
            }
			else if (harvesterCount < (minHarvesters + 1)){
                s.createCustomCreep(1300,`Harvester${Game.time}`,'harvester','generic');
			}
			else if (upgraderCount < minUpgraders + 1) {
                s.createCustomCreep(1300,`Upgrader${Game.time}`,'upgrader','generic');
			}
            else if (wallRepairerCount < minWallRepairer + 2){
                s.createCustomCreep(1300,`WallRepairer${Game.time}`,'wallrepairer','morespeed');
            }
			else if (harvesterCount < (minHarvesters + 2)){
                s.createCustomCreep(1300,`Harvester${Game.time}`,'harvester','generic');
			}
			else {
                s.createCustomCreep(1300,`Builder${Game.time}`,'builder','morespeed');
			}
		}
    }
}

module.exports = roleExtensionsUnderFourty;