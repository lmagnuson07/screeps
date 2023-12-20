var roleMiner = {
    run: function(creep, containers, room){
        if (creep.pos.isEqualTo(containers[0])){
            creep.harvest(room.sources[1]);
        }
        else {
            creep.moveTo(containers[0], {visualizePathStyle: {stroke: "#ffaa00"}});
        }
    }
}

module.exports = roleMiner;