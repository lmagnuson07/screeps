const HOME = 'E55S43';
const ROOM_RIGHT = 'E56S43';
const ROOM_LEFT = 'E54S43';

var generateCreep = {
    run: function (){
        StructureSpawn.prototype.createCustomCreep = function(totalEnergy,name,role,partsOption) {
            let body = [];
            if (totalEnergy === 300){
                if (partsOption === "generic"){
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
            }
            else if (totalEnergy === 550){
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
            else if (totalEnergy === 800){
                if (partsOption === "generic"){
                    //500 - work(100)
                    for(let i = 0; i < 5; i++){
                        body.push(WORK);
                    }
                    //200 - carry(50)
                    for(let i = 0; i < 4; i++){
                        body.push(CARRY);
                    }
                    //100 - move(50)
                    for(let i = 0; i < 2; i++){
                        body.push(MOVE);
                    }
                }
            }
            else if (totalEnergy === 1300){
                //harvesters and upgraders
                if (partsOption === "generic"){
                    //800 - work(100)
                    for(let i = 0; i < 8; i++){
                        body.push(WORK);
                    }
                    //400 - carry(50)
                    for(let i = 0; i < 7; i++){
                        body.push(CARRY);
                    }
                    //100 - move(50)
                    for(let i = 0; i < 3; i++){
                        body.push(MOVE);
                    }
                }
                // repairers, builders
                else if (partsOption === "morespeed"){
                    //600 - work(100)
                    for(let i = 0; i < 7; i++){
                        body.push(WORK);
                    }
                    //400 - carry(50)
                    for(let i = 0; i < 7; i++){
                        body.push(CARRY);
                    }
                    //300 - move(50)
                    for(let i = 0; i < 3; i++){
                        body.push(MOVE);
                    }
                }
            }
            return this.spawnCreep(body, name, {memory: {role: role, parts: partsOption}});
        }

        StructureSpawn.prototype.createLongDistanceHarvester = function(totalEnergy,name,role,partsOption) {
            // long distance harvesters
            let body = [];
            // 1800
            //2 - work(100)
            for(let i = 0; i < 2; i++){
                body.push(WORK);
            }
            //800 - carry(50)
            for(let i = 0; i < 16; i++){
                body.push(CARRY);
            }
            //800 - move(50)
            for(let i = 0; i < 16; i++){
                body.push(MOVE);
            }
            if (totalEnergy === 1800){
                // home:, target:, sourceId:
                if (partsOption == "longdistanceright"){
                    return this.spawnCreep(body,name, 
                        { memory: {
                            role: role, 
                            parts: partsOption,
                            home: HOME,
                            target: ROOM_RIGHT
                    }});
                }
                if (partsOption == "longdistanceleft"){
                    return this.spawnCreep(body,name, 
                        { memory: {
                            role: role, 
                            parts: partsOption,
                            home: HOME,
                            target: ROOM_LEFT
                    }});
                }
            }
        }
        StructureSpawn.prototype.createMiner = function(sourceId,name,role,partsOption) {
            // long distance harvesters
            return this.createMinor([WORK,WORK,WORK,WORK,WORK,MOVE], name, {memory: {role: role, sourceId: sourceId, parts: partsOption}});
        }
    }
}

module.exports = generateCreep;