const algo = require('./algo');
const constants = require('./constants');

class Rail {
    constructor(railID, color, width) {
        this.id = railID;
        this.direction = constants.directions[railID % 4];
        this.row = Math.trunc(Math.trunc(railID / 4) / width);
        this.col = Math.trunc(Math.trunc(railID / 4) % width);
        this.color = color;
        this.enabled = true;
    }
}

class RailMap {
    constructor() {
        this.rails = {};
    }

    add(rail) {
        if (rail.id in this.rails && this.rails[rail.id].enabled) {
            this.rails[rail.id] = rail;
            this.rails[rail.id].enabled = false;
        } else {
            this.rails[rail.id] = rail;
        }
    }

    solve() {
        let edgeList = algo.railsToEdges(this.rails);
        return algo.solve(edgeList);
    }

    encode() {
        let railColorMap = {};
        for (const [railID, rail] of Object.entries(this.rails)) {
            railColorMap[railID] = rail.color;
        }
        return railColorMap;
    }

    enabled(railID) {
        return railMap.rails[railID].enabled;
    }
}

module.exports.Rail = Rail;
module.exports.RailMap = RailMap;