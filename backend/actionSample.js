class Action{
    constructor(type, id){
        this.id = id; //unique action id
        this.type = type;
        this.params = {}; //stores final parameters applied to railMap
    }

    changeRailID(width) {
        this.params.id = this.type === "rail" ? ((this.params.row * width) + this.params.width) * 4 + this.params.directionNumber:-1;
    }

    transform(action){
        switch(this.type){
            case "rail":
                switch(action.type){
                    case "rail":
                        if(this.params.id === action.params.id){
                            if((this.params.color != "#FFFFFF" && action.params.color != "#FFFFFF") || this.params.color === action.params.color) delete this.params;
                        }
                        break;
                    case "insert":
                        let axis = action.params.axis;
                        if(this.params[axis] >= action.params.location){
                            if(this.params[axis] === action.params.location && action.params.offset === -1) delete this.params;
                            else {
                                this.params[axis] += action.params.offset
                                this.changeRailID(action.params.newWidth)
                            }
                        }
                        break;
                    case "changeSize":
                        if((action.params.newHeight-1 < this.params.row <= action.params.oldHeight -1) || (action.params.newWidth-1 < this.params.column <= action.params.oldWidth -1)) delete this.params;
                        break;
                }
        }
    }
}

function mergeAction(action, serverConflicts, clientConflicts){
    //takes in actions from server actionHistory and clientHistory with index pass the max length of client's actionHistory
    let serverIndex = 0;
    let clientIndex = 0;
    const conflicts = [];
    //const conflicts = serverConflicts.filter(conflict => { idea ko for this was ignore serverConflicts with action id found in clientConflicts cuz those client's actions were already part of the new action's context. this will fuck up in some cases
    for(let i =0; i < conflicts.length && typeof action.params != "undefined"; i++){
        //if(clientIndex < clientConflicts.length && client
        action.transform(conflicts[i]);
    }
}