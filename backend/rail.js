const algo = require('./algo');

class Rail {
    constructor(railID, color) {
        this.id = railID;
        this.color = color;
        this.enabled = enabled;
    }
}

class RailMap {
    constructor() {
        this.rails = {};
    }

    add(rail) {
        this.rails
    }

    toggle(railID) {
        for (let rail of this.rails) {
            if (rail.id == railID) {
                rail.enabled = !rail.enabled;
                break;
            }
        }
    }

    solve() {
        
    }

    encode() {

    }
}

module.exports.Rail = Rail;
module.exports.RailMap = RailMap;