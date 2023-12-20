var creepGenerate = {
    run: function(creepCount, totalExtensions, {hLimit, uLimit, bLimit, rLimit, mLimit, hasConstSite, hasRepairSite, hasSource1Cont, ...countArray}){
        let totalEnergy;
        let type;

        if (totalExtensions < 5) {
            totalEnergy = 300;
        } else {
            if (creepCount <= 5){
                totalEnergy = 300;
            } else {
                totalEnergy = 550;
            }
        }
        if (mLimit && hasSource1Cont){
            type = 'M';
        } else if (hLimit) {
            type = 'H';
        } else if (bLimit && hasConstSite) {
            type = 'B';
        } else if (rLimit && hasRepairSite) {
            type = 'R'
        } else {
            type = 'U';
        }

        // let name;
        // let dryRun;
        // do {
        //     let randomNum = Math.floor(Math.random() * 1000 + 1); 
        //     name = `${type}${randomNum}`;
        //     dryRun = Game.spawns["Spawn1"].cc(totalEnergy, name, type);
        // } while(dryRun !== ERR_NAME_EXISTS);

        Game.spawns["Spawn1"].cc(totalEnergy, `${type}${Game.time}`, type);
    }
}

module.exports = creepGenerate;