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

    set row(row){
        this.__row = row;
    }

    get col() {
        return this.__column;
    }

    set col(column){
        this.__column = column;
    }

    get color() {
        return this.enabled ? this.__color : "#FFFFFF";
    }

    get direction() {
        return constants.directions[this.__direction_number];
    }

    changeID(width) {
        this.id = ((this.__row * width) + this.__column) * 4 + this.__direction_number;
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
        this.lastAction = 0;
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
        
        for (let [railID, rail] of Object.entries(this.rails)) {
            rail.changeID(width);
            if (rail.isValid(this.width, this.height)) 
                newRails[rail.id] = rail;
        }

        this.rails = newRails;
    }

    insert (location, axis, insert) {
        let offset = insert? 1:-1;
        let newRails = {}

        if (axis == "row") this.height += offset;
        else this.width += offset;

        for (let[railID, rail] of Object.entries(this.rails)){
            if (rail[axis] == location){
                if(insert){
                    rail[axis] = rail[axis] + offset;
                    rail.changeID(this.width);
                    newRails[rail.id] = rail;
                }
            } else if(rail[axis] > location) {
                rail[axis] = rail[axis] + offset;
                rail.changeID(this.width);
                newRails[rail.id] = rail;
            } else {
                rail.changeID(this.width);
                newRails[rail.id] = rail;
            }
        }

        this.rails = newRails;
    }
}

module.exports.Rail = Rail;
module.exports.RailMap = RailMap;