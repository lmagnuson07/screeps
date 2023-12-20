var prototypeCreep = {
    run: function() {
        Creep.prototype.setMemory = function(config, role, secondRole=null) {
            if (!secondRole) {
                if (this.memory[role] && this.store[RESOURCE_ENERGY] == 0) {
                    this.memory[role] = false;
                    this.say(config.phrases.harvest);
                }
                if (!this.memory[role] && this.store.getFreeCapacity() == 0) {
                    this.memory[role] = true;
                    this.say(config.phrases[role]);
                }
            } else {
                if (this.memory[role] && this.store[RESOURCE_ENERGY] == 0 && !this.memory[secondRole]) {
                    this.memory[role] = false;
                    this.say(config.phrases.harvest);
                }
                if (!this.memory[role] && this.store.getFreeCapacity() == 0 && !this.memory[secondRole]) {
                    this.memory[role] = true;
                    this.say(config.phrases[role]);
                }
            }
        }
        
        Creep.prototype.setRoleRestriction = function(args) {
            let structures = null;
            if (args.restrictedList.length > 0) {
                this.memory[args.restriction] = true;
            }
            if (args.fullList.length === 0 && this.memory[args.restriction]) {
                this.memory[args.restriction] = false;
            }
            if (this.memory[args.restriction]) {
                structures = args.fullList;
            }
            if (!this.memory[args.restriction]) {
                structures = args.newList;
            }
            return structures;
        }

        Creep.prototype.setRoleRestrictionSingle = function(args) {
            let structures = null;
            if (args.restrictedItem !== null) {
                this.memory[args.restriction] = true;
            }
            if (args.fullItem === null && this.memory[args.restriction]) {
                this.memory[args.restriction] = false;
            }
            if (this.memory[args.restriction]) {
                structures = args.fullItem;
            }
            if (!this.memory[args.restriction]) {
                structures = args.newItem;
            }
            return structures;
        }
    }
}
module.exports = prototypeCreep;