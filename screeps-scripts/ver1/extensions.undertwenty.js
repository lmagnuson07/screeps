var generateCreep = require('prototype.spawncreep');

// 800 energy
var roleExtensionsUnderTwenty = {
    run: function (){
        generateCreep.run();
        // 10 total
        let minBaseHarvester = 1;
        let minHarvesters = 3;
        let minUpgraders = 3;
        let minBuilders = 2;
        let minRepairers = 1;

        let baseHarvesterCount = _.sum(Game.creeps, (c) => c.memory.role == "baseharvester");
        let harvesterCount = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
        let upgraderCount = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
        let builderCount = _.sum(Game.creeps, (c) => c.memory.role == "builder");
	    let repairerCount = _.sum(Game.creeps, (c) => c.memory.role == "repairer");
        
        let s = Game.spawns["Spawn1"];
        if (baseHarvesterCount < minBaseHarvester) {
            s.createCustomCreep(800,`BaseHarvester${Game.time}`,'baseharvester','generic');
        }
        else if (harvesterCount < minHarvesters) {
            s.createCustomCreep(800,`Harvester${Game.time}`,'harvester','generic');
        }
        else if (upgraderCount < minUpgraders) {
            s.createCustomCreep(800,`Upgrader${Game.time}`,'upgrader','generic');
        }
        else if (builderCount < minBuilders) {
            s.createCustomCreep(800,`Builder${Game.time}`,'builder','generic');
        }
        else if (repairerCount < minRepairers) {
            s.createCustomCreep(800,`Repairer${Game.time}`,'repairer','generic');
		}
        else {
            if (harvesterCount < minHarvesters + 1){
                s.createCustomCreep(800,`Harvester${Game.time}`,'harvester','generic');
            }
            else if (upgraderCount < minUpgraders + 2) {
                s.createCustomCreep(800,`Upgrader${Game.time}`,'upgrader','generic');
            }
            else if (builderCount < minBuilders + 1) {
                s.createCustomCreep(800,`Builder${Game.time}`,'builder','generic');
            }
            else if (repairerCount < minRepairers + 1) {
                s.createCustomCreep(800,`Repairer${Game.time}`,'repairer','generic');
            }
            else {
                s.createCustomCreep(800,`Builder${Game.time}`,'builder','generic');
            }
        }
    }
}

module.exports = roleExtensionsUnderTwenty;