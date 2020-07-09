const algo = require('./algo');
const constants = require('./constants');

class Rail {
    constructor(railID, color, width) {
        this.id = railID;
        this.direction = constants.directions[railID % 4];
        this.__row = Math.trunc(Math.trunc(railID / 4) / width);
        this.__column = Math.trunc(Math.trunc(railID / 4) % width);
        this.__color = color;
        this.enabled = true;
    }

    get row() {
        return this.__row;
    }

    get col() {
        return this.__column;
    }

    get color() {
        return this.enabled ? this.__color : "#FFFFFF";
    }
}

class RailMap {
    constructor(width) {
        this.rails = {};
        this.width = width;
    }

    add(railID, color, placed) {
        let rail = new Rail(railID, color, this.width)
        this.rails[rail.id] = rail;
        this.rails[rail.id].enabled = placed;
    }

    solve() {
        let edgeList = algo.railsToEdges(this.rails);
        return algo.solve(edgeList);
    }

    encode() {
        let railColorMap = {};
        for (const [railID, rail] of Object.entries(this.rails)) {
            railColorMap[railID] = rail.enabled ? rail.color : "#FFFFFF";
        }
        return railColorMap;
    }

    color(railID) {
        return railID in this.rails ? this.rails[railID].color : "#FFFFFF";
    }
}

module.exports.Rail = Rail;
module.exports.RailMap = RailMap;