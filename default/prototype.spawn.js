var prototypeSpawn = {
    run: function() {
        Spawn.prototype.cc = function(totalEnergy, name, role) {
            let body = [];
            name = name + this.creepCount;
            if (totalEnergy === 300) {
                body = [
                    WORK, WORK, CARRY, MOVE
                ];
            }
            return this.spawnCreep(body, name, { memory: { role: role } });
        }

        Object.defineProperty(Spawn.prototype, 'creepCount', {
            get: function() {
                // If we dont have the value stored locally
                if (!this._creepCount) {
                    if (!this.memory.creepcount) {
                        this.memory.creepcount = 1;
                    }
                    this._creepCount = this.memory.creepcount;
                } else {
                    if (this.memory.creepcount >= 1000) {
                        this._creepCount = 1;
                        this.memory.creepcount = 1;
                    } else {
                        this._creepCount++;
                        this.memory.creepcount++;
                    }
                }
                return this._creepCount;
            },
            enumerable: true,
            configurable: true
        });
    }
}
module.exports = prototypeSpawn;