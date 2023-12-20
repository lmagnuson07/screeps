var prototypeSpawn = {
    run: function(){
        Spawn.prototype.cc = function(totalEnergy, name, role, partsOption="generic") {
            let body = [];
            if (totalEnergy === 300) {
                if (partsOption === "generic") {
                    //200 - work(100)
                    for(let i = 0; i < 2; i++){
                        body.push(WORK);
                    }
                    //50 - carry(50)
                    for(let i = 0; i < 1; i++){
                        body.push(CARRY);
                    }
                    //50 - move(50)
                    for(let i = 0; i < 1; i++){
                        body.push(MOVE);
                    }
                }
            } else if (totalEnergy === 550) {
                if (partsOption === "generic"){
                    //300 - work(100)
                    for(let i = 0; i < 3; i++){
                        body.push(WORK);
                    }
                    //150 - carry(50)
                    for(let i = 0; i < 3; i++){
                        body.push(CARRY);
                    }
                    //100 - move(50)
                    for(let i = 0; i < 2; i++){
                        body.push(MOVE);
                    }
                }
            }
            return this.spawnCreep(body, name, {memory: {role: role, parts: partsOption}})
        }
    }
}

module.exports = prototypeSpawn;