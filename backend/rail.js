const algo = require('./algo');
const constants = require('./constants')

class Rail {
    constructor(railID, color, width) {
        this.id = railID;
        this.direction = constants.direction[railID % 4];
        this.row = Math.trunc(Math.trunc(railID / 4) / width);
        this.col = Math.trunc(Math.trunc(railID / 4) % width);
        this.color = color;
        this.enabled = enabled;
    }
}

class RailMap {
    constructor() {
        this.rails = {};
    }

    add(rail) {
        this.rails[rail.id] = rail;
    }

    toggle(railID) {
        if (railID in this.rails) {
            this.rails[railID].enabled = !this.rails[railID].enabled;
        }
    }

    solve() {
        
    }

    encode() {

    }
}

module.exports.Rail = Rail;
module.exports.RailMap = RailMap;