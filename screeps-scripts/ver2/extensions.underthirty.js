var generateCreep = require('prototype.spawncreep');

// 1300 energy
var roleExtensionsUnderThirty = {
    run: function (){
		generateCreep.run();
        // 9 total
        let minBaseHarvester = 1;
        let minHarvesters = 2;
        let minUpgraders = 2;
        let minBuilders = 1;
        let minRepairers = 1;
        let minMilitia = 1;
        let minWallRepairer = 1;

        let baseHarvesterCount = _.sum(Game.creeps, (c) => c.memory.role == "baseharvester");
        let harvesterCount = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
        let upgraderCount = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
        let builderCount = _.sum(Game.creeps, (c) => c.memory.role == "builder");
	    let repairerCount = _.sum(Game.creeps, (c) => c.memory.role == "repairer");
	    let militiaCount = _.sum(Game.creeps, (c) => c.memory.role == "militia");
	    let wallRepairerCount = _.sum(Game.creeps, (c) => c.memory.role == "wallrepairer");

        let s = Game.spawns["Spawn1"];
        if (baseHarvesterCount < minBaseHarvester) {
			s.createCustomCreep(1300,`BaseHarvester${Game.time}`,'baseharvester','morespeed');
		}
		else if (harvesterCount < minHarvesters) {
			s.createCustomCreep(1300,`Harvester${Game.time}`,'harvester','generic');
		}
		else if (upgraderCount < minUpgraders) {
			s.createCustomCreep(1300,`Upgrader${Game.time}`,'upgrader','morecarry');
		}
		else if (repairerCount < minRepairers) {
			s.createCustomCreep(1300,`Repairer${Game.time}`,'repairer','generic');
		}
		else if (builderCount < minBuilders) {
			s.createCustomCreep(1300,`Builder${Game.time}`,'builder','generic');
		}
        else if (militiaCount < minMilitia){
			s.createCustomCreep(1300,`Militia${Game.time}`,'militia','morecarry');
        }
        else if (wallRepairerCount < minWallRepairer){
			s.createCustomCreep(1300,`WallRepairer${Game.time}`,'wallrepairer','morecarry');
        }
		else {
			if (repairerCount < (minRepairers + 1)){
				s.createCustomCreep(1300,`Repairer${Game.time}`,'repairer','generic');
			}
			else if (wallRepairerCount < minWallRepairer + 1){
				s.createCustomCreep(1300,`WallRepairer${Game.time}`,'wallrepairer','morecarry');
            }
			else if (harvesterCount < (minHarvesters + 1)){
				s.createCustomCreep(1300,`Harvester${Game.time}`,'harvester','generic');
			}
			else if (upgraderCount < minUpgraders + 1) {
				s.createCustomCreep(1300,`Upgrader${Game.time}`,'upgrader','morecarry');
			}
            else if (wallRepairerCount < minWallRepairer + 2){
				s.createCustomCreep(1300,`WallRepairer${Game.time}`,'wallrepairer','morecarry');
            }
			else if (harvesterCount < (minHarvesters + 2)){
				s.createCustomCreep(1300,`Harvester${Game.time}`,'harvester','generic');
			}
			else {
				s.createCustomCreep(1300,`Builder${Game.time}`,'builder','generic');
			}
		}
    }
}

module.exports = roleExtensionsUnderThirty;