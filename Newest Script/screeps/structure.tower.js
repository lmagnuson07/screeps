var towers = {
    run: function(towers){
        for (let tower of towers){
            var targets = tower.pos.findInRange(FIND_HOSTILE_CREEPS, 20);
            if (targets.length > 0){
                tower.attack(targets[0]);
            }
        }
    }
}

module.exports = towers;

