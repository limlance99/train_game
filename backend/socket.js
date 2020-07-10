const utils = require('./utils');
const rail = require('./rail');

module.exports.init = (io, railMap, users, actionHistory) => {
    let frozen = false;
    io.on("connection", socket => {
        users[socket.id] = {
            color: utils.chooseRandomColor()
        }

        socket.emit("startUp", {
            map: railMap.encode(), 
            actionHistory: actionHistory,
            color: users[socket.id].color,
            users: users, 
            width: railMap.width,
            height: railMap.height
        });

        socket.on("disconnect", data => {
            frozen = false;
            if (socket.id in users) {
                io.sockets.emit("userLeft", {
                    name: users[socket.id].name,
                    color: users[socket.id].color,
                    id: socket.id,
                    message: "has disconnected",
                    time: (new Date()).toLocaleTimeString()
                });

                delete users[socket.id];
            }
        });

        socket.on("railClicked", async (data) => {
            await utils.timeout(1000);
            let railID = data.id;
            let placed = data.placed;
            
            if (socket.id in users && !frozen) {
                railMap.add(railID, users[socket.id].color, placed);
                action = {
                    name: users[socket.id].name,
                    color: users[socket.id].color,
                    message: placed ? `added rail ${railID}` : `removed rail ${railID}`,
                    time: (new Date()).toLocaleTimeString(),
                    error: false
                };
                io.sockets.emit("newRail", {
                    rail: {
                        id: railID,
                        color: railMap.color(railID)
                    },
                    newHistory: action
                });
                actionHistory.push(action);
            }

            else {
                socket.emit("newRail", {
                    rail: {
                        id: railID,
                        color: railMap.color(railID)
                    },
                    newHistory: {
                        name: "You",
                        color: users[socket.id].color,
                        message: `failed to modify rail ${railID}`,
                        time: (new Date()).toLocaleTimeString(),
                        error: true
                    }
                });
            }
        });

        socket.on("goClicked", data => {
            if (frozen)
                return;
            frozen = true;
            action = {
                name: users[socket.id].name,
                color: users[socket.id].color,
                message: `started the train`,
                time: (new Date()).toLocaleTimeString()
            };
            io.sockets.emit("moveTrain", {
                directions: railMap.solve(),
                newHistory: action
            });
            actionHistory.push(action);
        });

        socket.on("trainStop", data => {
            frozen = false;
        });

        socket.on("sendName", name => {
            // console.log(name)
            users[socket.id].name = name;

            message = `${users[socket.id].name} ${utils.joinMessage()}`;
            
            socket.emit("userAccept");
            io.sockets.emit("userJoined", {
                name: users[socket.id].name,
                color: users[socket.id].color,
                id: socket.id,
                message: utils.joinMessage(),
                accepted: true,
                time: (new Date()).toLocaleTimeString()
            });
            
        });

        socket.on("sendMessage", data => {
            if (socket.id in users) {
                switch(data.split(" ")[0]){
                    case "/private":
                        for(let [userID, userData] of Object.entries(users)){ 
                            if (userData.name == data.split(" ")[1]) {
                                let privateMessage = "//whispers/// " + data.split(" ").slice(2).join(" ");
                                
                                io.to(userID).emit("broadcastMessage", {
                                    name: users[socket.id].name,
                                    color: users[socket.id].color,
                                    message: privateMessage,
                                    time: (new Date()).toLocaleTimeString()
                                });
                            }
                        }
                        break;

                    case "/clear":
                        this.railMap = new rail.RailMap(this.railMap.width, this.railMap.height);
                        
                        break;

                    default:
                        io.sockets.emit("broadcastMessage", {
                        name: users[socket.id].name,
                        color: users[socket.id].color,
                        message: data,
                        time: (new Date()).toLocaleTimeString()
                    }); 
                }
            }
        });

        socket.on("upsertRowCol", data => {
            if(!frozen){
                railMap.insert(data.index, data.axis, data.isInsert);
                let action = {
                    name: users[socket.id].name,
                    color: users[socket.id].color,
                    message: `${data.isInsert? "inserted at":"removed"} ${data.axis} ${data.index + 1}`,
                    time: (new Date()).toLocaleTimeString(),
                    error: false
                }

                actionHistory.push(action);

                io.sockets.emit("newMap", {
                    height: railMap.height,
                    width: railMap.width,
                    map: railMap.encode(),
                    newHistory: action
                });
            } else {
                sockets.emit("newMap", {
                    height: railMap.height,
                    width: railMap.width,
                    map: railMap.encode(),
                    newHistory: {
                        name: "You",
                        color: users[socket.id].color,
                        message: `failed to ${data.isInsert? "insert at":"remove"} ${data.axis} ${data.index + 1}`,
                        time: (new Date()).toLocaleTimeString(),
                        error: true
                    }
                });
            }
        });

        socket.on("changeDimensions", dimensions => {
            railMap.transform(dimensions.width, dimensions.height);
            
            io.sockets.emit("newMap", {
                height: railMap.height,
                width: railMap.width,
                map: railMap.encode()
            });
        });
    });
}