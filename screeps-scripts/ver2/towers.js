var towers = {
    run: function(){
		var towers = Game.rooms.E55S43.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_TOWER
        });
        for (let tower of towers){
            var targets = tower.pos.findInRange(FIND_HOSTILE_CREEPS, 20);
            if (targets.length > 0){
                tower.attack(targets[0]);
            }
        }
    }
}

module.exports = towers;

