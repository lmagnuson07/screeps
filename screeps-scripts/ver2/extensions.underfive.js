var generateCreep = require('prototype.spawncreep');

// 300 energy
var roleExtensionsUnderFive = {
    run: function (){
        generateCreep.run();
        // 15 total
        let minBaseHarvester = 1;
        let minHarvesters = 5;
        let minUpgraders = 4;
        let minBuilders = 5;

        let baseHarvesterCount = _.sum(Game.creeps, (c) => c.memory.role == "baseharvester");
        let harvesterCount = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
        let upgraderCount = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
        let builderCount = _.sum(Game.creeps, (c) => c.memory.role == "builder");
        
        let s = Game.spawns["Spawn1"];
        if (baseHarvesterCount < minBaseHarvester) {
            s.createCustomCreep(300,`BaseHarvester${Game.time}`,'baseharvester','generic');
        }
        else if (harvesterCount < minHarvesters) {
            s.createCustomCreep(300,`Harvester${Game.time}`,'harvester','generic');
        }
        else if (upgraderCount < minUpgraders) {
            s.createCustomCreep(300,`Upgrader${Game.time}`,'upgrader','generic');
        }
        else if (builderCount < minBuilders) {
            s.createCustomCreep(300,`Builder${Game.time}`,'builder','generic');
        }
        else {
            if (harvesterCount < minHarvesters + 1){
                s.createCustomCreep(300,`Harvester${Game.time}`,'harvester','generic');
            }
            else if (upgraderCount < minUpgraders + 1) {
                s.createCustomCreep(300,`Upgrader${Game.time}`,'upgrader','generic');
            }
            else if (builderCount < minBuilders + 1) {
                s.createCustomCreep(300,`Builder${Game.time}`,'builder','generic');
            }
            else {
                s.createCustomCreep(300,`Builder${Game.time}`,'builder','generic');
            }
        }
    }
}

module.exports = roleExtensionsUnderFive;