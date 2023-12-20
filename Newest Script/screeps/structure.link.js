var links = {
    run: function(theLinks, minLinkEnergy){
        // Transfer energy from the link to another structure
        if (theLinks[0].store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            if (theLinks[1].store.getUsedCapacity(RESOURCE_ENERGY) >= minLinkEnergy) {
                theLinks[1].transferEnergy(theLinks[0]);
            }
        }
        if (theLinks[1].store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            if (theLinks[2].store.getUsedCapacity(RESOURCE_ENERGY) >= minLinkEnergy) {
                theLinks[2].transferEnergy(theLinks[1]);
            }
        }
    }
}

module.exports = links;