const algo = require('./algo');
const constants = require('./constants');

class Rail {
    constructor(railID, color, width) {
        this.id = railID;
        this.__direction_number = railID % 4;
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

    get direction() {
        return constants.directions[this.__direction_number];
    }

    changeID(width) {
        this.id = ((this.__row * width) + this.__column) * 4 + this.__direction_numbers;
    }

    isValid(width, height) {
        return this.__row < height && this.__column < width;
    }
}

class RailMap {
    constructor(width, height) {
        this.rails = {};
        this.invalidRails = [];
        this.width = width;
        this.height = height;
    }

    add(railID, color, placed) {
        let rail = new Rail(railID, color, this.width)
        this.rails[rail.id] = rail;
        this.rails[rail.id].enabled = placed;
    }

    toEdgeList() {
        let edgeList = [];
        for (const [railID, rail] of Object.entries(this.rails)) {
            if (rail.enabled) {
                let nodeA = [
                    1 + (2 * rail.row),
                    1 + (2 * rail.col)
                ];
                let nodeB = algo.add(nodeA, algo.vector[rail.direction]);
                edgeList.push([nodeA, nodeB]);
            }
        }
        return edgeList;
    }

    solve() {
        return algo.solve(this.toEdgeList());
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

    transform(width, height) {
        this.height = height;
        this.width = width;
        let newRails = {};
        let newInvalidRails = [];
        for (let [railID, rail] of Object.entries(this.rails)) {
            rail.changeID(width);
            if (rail.isValid(this.width, this.height)) 
                newRails[rail.id] = rail;
            else
                newInvalidRails.push(rail);
        }
        for (let rail of this.invalidRails) {
            rail.changeID(width);
            if (rail.isValid(this.width, this.height)) 
                newRails[rail.id] = rail;
            else
                newInvalidRails.push(rail);
        }
        this.rails = newRails;
        this.invalidRails = newInvalidRails;
    }

    transformTest(width, height) {
        this.height = height;
        this.width = width;
        let newRails = {};
        let newInvalidRails = [];
        for (let [railID, rail] of Object.entries(this.rails)) {
            rail.changeID(width);
            if (rail.isValid(this.width, this.height)) 
                newRails[rail.id] = rail;
            else
                newInvalidRails.push(rail);
        }
        for (let rail of this.invalidRails) {
            rail.changeID(width);
            if (rail.isValid(this.width, this.height)) 
                newRails[rail.id] = rail;
            else
                newInvalidRails.push(rail);
        }
        this.rails = newRails;
        this.invalidRails = newInvalidRails;
    }
}

module.exports.Rail = Rail;
module.exports.RailMap = RailMap;