var towers = {
    run: function(){
		var towers = Game.rooms.E55S43.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_TOWER
        });
        for (let tower of towers){
            var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (target != undefined){
                tower.attack(target);
            }
        }
    }
}

module.exports = towers;

