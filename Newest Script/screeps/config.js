module.exports =  { 
    ///////////// Creep counts //////////////////////
    creepMax: function() {
        return this.builderMax + this.repairerMax + this.wallRepairerMax + this.harvesterMax + this.upgraderMax + this.minerMax + this.minerTwoMax 
            + this.lorryMax + this.lorryTwoMax + this.militiaMax + this.longDistanceHarvesterMax + this.graveKeeperMax + this.mineralMinerOneMax + this.mineralLorryOneMax
            + 1
    },
    creepMin: 3,
    // Hierarchy roles
    graveKeeperMax: 1,
    militiaMax: 1,
    builderMax: 0,
    repairerMax: 0,
    wallRepairerMax: 0,
    harvesterMax: 0,
    upgraderMax: 2,
    // Special roles
    minerMax: 1,
    minerTwoMax: 1,
    lorryMax: 2,
    lorryTwoMax: 1,
    longDistanceHarvesterMax: 1,
    // Mineral roles
    mineralMinerOneMax: 1,
    mineralLorryOneMax: 1,
    ///////////// IDs /////////////////////////////
    // Rooms 
    mainRoom: "W5N1",
    secondRoom: "W4N1",
    mainSpawnName: "Spawn1",
    roomMineralType: RESOURCE_KEANIUM,
    // Areas 
    areaOneIndex: 0,
    areaTwoIndex: 1,
    areaThreeIndex: 2,
    // Links
    linkOneId: "465c43a311d4e1b",
    linkTwoId: "0adb46119dd8dd9",
    linkThreeId: "217f32c4b635bca",
    // Containers
    containerOfOneId: "52184ff59c48d0e",
    containerOfTwoId: "4ffb7ead2cd4a99",
    containerOfThreeId: "6d42defb64eee16",
    storageContainerOneId: "14bc82f020e08e7",
    storageContainerTwoId: "fc7d809b9479936",
    // Sources
    mainRoomMainSourceIndex: 1,
    mainRoomSecondSourceIndex: 0,
    targetRoomSourceId: "b8e80773ec3d49f",
    longDistanceHarvesterContainerId: "",
    // Minerals
    mainRoomMineralId: "e5966164d5fdc16",
    mainRoomExtractorId: "9d96e0c04b36646",
    // Coordinates
    targetRoomExitRightX: 0,
    targetRoomExitRightY: 34,
    homeRoomExitRightX: 49,
    homeRoomExitRightY: 34,
    /////////// Flags /////////////////////////////
    flags: {
        // Main source
        l1: "L1",
        p1: "P1",
        // Second source
        l3: "L3",
        p2: "P2",
        // Extractor mine
        l4: "L4",
        p3: "P3",
        // Other
        storage1: "storage1",
        i1: "i1"
    },
    /////////// Caps //////////////////////////////
    wallMaxHealth: 1000000,
    containerMinHits: 225000,
    mineralContainerMinHits: 200000,
    mineralContainerCapacityOffset: 400,
    availableEnergyCap: 1600,
    harvesterRoleSwappingLevel: 2,
    minLinkEnergy: LINK_CAPACITY,
    minerOneCost: 550,
    minerTwoCost: 800,
    minerThreeCost: 1800,
    minerOneSpawnTime: 1480,
    minerTwoSpawnTime: 1465,
    maxRoadHits: ROAD_HITS - 1000, // Every 5000 ticks, repair roads for 500
    maxDroppedResourceAmount: 50,
    //////////// Boolean values ///////////////////
    graveKeeperBuilds: false,
    ////// Creep phrases, visualizePathStyle functions, and path colors //////////
    phrases: {
        harvest: '⛏️ harvest',
        building: '🚧 build',
        repairing: '🛠️ repair',
        repairingwall: '🧱 repair',
        transfering: '📦transfer',
        supplying: '⚒️ supply',
        upgrading: '🔧 upgrade',
        transferbody: '☠️transfer'
    },
    colors: {
        green: '#96ceb4',
        darkGreen: '#588c7e',
        brown: '#d9ad7c',
        darkBrown: '#674d3c',
        yellow: '#ffcc5c',
        darkYellow: '#f2e394',
        orange: '#bd5734',
        darkOrange: '#c1502e',
        grey: '#686256',
        darkGrey: '#454140',
        brightGreen: '#AAFF00',
        brightGreenDarker: '#ddff33',
        purple: "#993399",
        darkPurple: "#800080",
    },
    lorryTransferPath: function() {
        return {
            visualizePathStyle: {
                fill: 'transparent',
                stroke: this.colors.green,
                lineStyle: 'solid',
                strokeWidth: .15,
                opacity: .5
            }
        }
    },
    lorryCollectPath: function() {
        return {
            visualizePathStyle: {
                fill: 'transparent',
                stroke: this.colors.darkGreen,
                lineStyle: 'dashed',
                strokeWidth: .15,
                opacity: .5
            }
        }
    },
    repairerRepairPath: function() {
        return {
            visualizePathStyle: {
                fill: 'transparent',
                stroke: this.colors.darkBrown,
                lineStyle: 'solid',
                strokeWidth: .15,
                opacity: .5
            }
        }
    },
    repairerCollectPath: function() {
        return {
            visualizePathStyle: {
                fill: 'transparent',
                stroke: this.colors.brown,
                lineStyle: 'dashed',
                strokeWidth: .15,
                opacity: .5
            }
        }
    },
    upgraderUpgradePath: function() {
        return {
            visualizePathStyle: {
                fill: 'transparent',
                stroke: this.colors.darkYellow,
                lineStyle: 'solid',
                strokeWidth: .15,
                opacity: .6
            }
        }
    },
    upgraderCollectPath: function() {
        return {
            visualizePathStyle: {
                fill: 'transparent',
                stroke: this.colors.yellow,
                lineStyle: 'dashed',
                strokeWidth: .15,
                opacity: .6
            }
        }
    },
    harvesterHarvestPath: function() {
        return {
            visualizePathStyle: {
                fill: 'transparent',
                stroke: this.colors.darkOrange,
                lineStyle: 'dashed',
                strokeWidth: .15,
                opacity: .5
            }
        }
    },
    harvesterTransferPath: function() {
        return {
            visualizePathStyle: {
                fill: 'transparent',
                stroke: this.colors.orange,
                lineStyle: 'solid',
                strokeWidth: .15,
                opacity: .5
            }
        }
    },
    builderBuildPath: function() {
        return {
            visualizePathStyle: {
                fill: 'transparent',
                stroke: this.colors.darkGrey,
                lineStyle: 'solid',
                strokeWidth: .15,
                opacity: .5
            }
        }
    },
    builderCollectPath: function() {
        return {
            visualizePathStyle: {
                fill: 'transparent',
                stroke: this.colors.grey,
                lineStyle: 'dashed',
                strokeWidth: .15,
                opacity: .5
            }
        }
    },
    graveKeeperCollectPath: function() {
        return {
            visualizePathStyle: {
                fill: 'transparent',
                stroke: this.colors.brightGreen,
                lineStyle: 'solid',
                strokeWidth: .15,
                opacity: .5
            }
        }
    },
    graveKeeperTransferPath: function() {
        return {
            visualizePathStyle: {
                fill: 'transparent',
                stroke: this.colors.brightGreenDarker,
                lineStyle: 'dashed',
                strokeWidth: .15,
                opacity: .5
            }
        }
    },
    mineralLorryTransferPath: function() {
        return {
            visualizePathStyle: {
                fill: 'transparent',
                stroke: this.colors.purple,
                lineStyle: 'solid',
                strokeWidth: .15,
                opacity: .5
            }
        }
    },
    mineralLorryCollectPath: function() {
        return {
            visualizePathStyle: {
                fill: 'transparent',
                stroke: this.colors.darkPurple,
                lineStyle: 'dashed',
                strokeWidth: .15,
                opacity: .5
            }
        }
    },
};