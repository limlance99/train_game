const utils = require('./utils');
const rail = require('./rail');

class Action {
    constructor(emitType, data, color) {
        if (emitType == "railClicked") {
            if (data.placed)
                this.type = "placeRail";
            else
                this.type = "removeRail";
        } else if (emitType == "upsertRowCol") {
            if (data.isInsert) {
                if (data.axis == "row")
                    this.type = "insertRow";
                else
                    this.type = "insertColumn";
            } else {
                if (data.axis == "row")
                    this.type = "deleteRow";
                else
                    this.type = "deleteColumn";
            }
        }
        this.id = utils.getRandomID();
        this.predecessorID = data.predecessorID;
        this.data = data;
        if (this.modifyType == "rail") {
            this.rail = new rail.Rail(this.data.id, this.color, this.data.width);
        }
    }

    applyChanges(railMap) {
        railMap.add(this);
    }
    undoChanges(railMap) {}

    get modifyType() {
        switch (this.type) {
            case "placeRail":
            case "removeRail":
                return "rail";
            case "insertRow":
            case "deleteRow":
                return "row";
            case "insertColumn":
            case "deleteColumn":
                return "column";
        }
    }
}

class RailMapWithHistory extends rail.RailMap {
    constructor() {
        super();
        this.history = {};
        this.lastActionID = 0;
    }

    apply(action) {
        if (action.predecessorID == this.lastActionID) {
            action.applyChanges(this);
            return action;
        }

        let lastAction = this.history[this.lastActionID];

        if (lastAction.type == "placeRail" || lastAction.type == "removeRail") {
            action.applyChanges(this);
            return action;
        }

        if (lastAction.type == "insertRow") {
            if (action.modifyType == "row") {
                if (action.data.index >= lastAction.data.index) 
                    action.data.index += 1;
                action.applyChanges(this);
                return action;
            } else if (action.modifyType == "column") {
                action.applyChanges(this);
                return action;
            } else if (action.modifyType == "rail") {
                if (action.data.row >= lastAction.data.index)
                    action.row = action.row + 1;
                action.applyChanges(this);
                return action;
            }
        }

        if (lastAction.type == "insertColumn") {
            if (action.modifyType == "column") {
                if (action.data.index >= lastAction.data.index) 
                    action.data.index += 1;
                action.applyChanges(this);
                return action;
            } else if (action.modifyType == "row") {
                action.applyChanges(this);
                return action;
            } else if (action.modifyType == "rail") {
                if (action.data.col >= lastAction.data.index)
                    action.col = action.col + 1;
                action.applyChanges(this);
                return action;
            }
        }

        if (lastAction.type == "deleteRow") {
            if (action.type == "insertRow") {
                if (action.data.index > lastAction.data.index) 
                    action.data.index -= 1;
                action.applyChanges(this);
                return action;
            } else if (action.type == "deleteRow") {
                if (action.data.index > lastAction.data.index) 
                    action.data.index -= 1;
                else if (action.data.index == lastAction.data.index) 
                    return undefined;
                action.applyChanges(this);
                return action;
            } else if (action.modifyType == "column") {
                action.applyChanges(this);
                return action;
            } else if (action.modifyType == "rail") {
                if (action.data.row > lastAction.data.index)
                    action.row = action.row - 1;
                else if (action.data.index == lastAction.data.index) 
                    return undefined;
                action.applyChanges(this);
                return action;
            }
        }

        if (lastAction.type == "deleteColumn") {
            if (action.type == "insertColumn") {
                if (action.data.index > lastAction.data.index) 
                    action.data.index -= 1;
                action.applyChanges(this);
                return action;
            } else if (action.type == "deleteColumn") {
                if (action.data.index > lastAction.data.index) 
                    action.data.index -= 1;
                else if (action.data.index == lastAction.data.index) 
                    return undefined;
                action.applyChanges(this);
                return action;
            } else if (action.modifyType == "row") {
                action.applyChanges(this);
                return action;
            } else if (action.modifyType == "rail") {
                if (action.data.row > lastAction.data.index)
                    action.col = action.col - 1;
                else if (action.data.index == lastAction.data.index) 
                    return undefined;
                action.applyChanges(this);
                return action;
            }
        }
    }

    add(action) {
        this.history[action.id] = action;
        this.lastActionID = action.id;
    }

    getAllPredecessors(actionID) {
        let predecessors = [];
        let predecessorID = this.history[actionID].predecessorID;
        while (predecessorID != 0) {
            predecessors.push(predecessorID);
            predecessorID = this.history[predecessorID].predecessorID;
        }
        return predecessors;
    }
}

module.exports.RailMapWithHistory = RailMapWithHistory;
module.exports.Action = Action;