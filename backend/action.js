const utils = require('./utils');
const { merge } = require('jquery');

class Action {
    constructor(predecessorID, type) {
        this.id = utils.getRandomID();
        this.predecessorID = predecessorID;
        this.type = type;
    }

    applyChanges(railMap) {}
    undoChanges(railMap) {}
}

class ActionHistory {
    constructor() {
        this.history = {};
        this.lastActionID = 0;
    }

    add(actionID, type) {
        action = new Action(this.lastActionID, type);
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

class InsertRowAction extends Action {
    constructor(predecessor, row) {
        super(predecessor);
        this.row = row;
    }
    applyChanges(railMap) {
        switch(railMap.lastAction.type) {
            case 
        }
    }
}

class InsertColumnAction extends Action {
    constructor(predecessor, column) {
        super(predecessor);
        this.column = column;
    }
}

class DeleteRowAction extends Action {
    constructor(predecessor, row) {
        super(predecessor);
        this.row = row;
    }
}

class DeleteColumnAction extends Action {
    constructor(predecessor, column) {
        super(predecessor);
        this.column = column;
    }
}

class PlaceRailAction extends Action {
    constructor(predecessor, row, column) {

    }
}

class DeleteRailAction extends Action {
    constructor(predecessor, row, column) {

    }
}

class MergeAction extends Action {
    constructor(predecessors, row, column) {

    }
}