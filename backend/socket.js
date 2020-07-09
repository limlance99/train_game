const utils = require('./utils');
const rail = require('./rail');

module.exports.init = (io, railMap, users, actionHistory) => {
    let frozen = false;
    io.on("connection", socket => {
        users[socket.id] = {
            color: utils.chooseRandomColor()
        }

        console.log(railMap.encode());

        socket.emit("startUp", {
            map: railMap.encode(), 
            actionHistory: actionHistory,
            color: users[socket.id].color,
            width: railMap.width,
            height: railMap.height
        });

        socket.on("disconnect", data => {
            frozen = false;
            if (socket.id in users) {
                io.sockets.emit("userLeft", {
                    name: users[socket.id].name,
                    color: users[socket.id].color,
                    message: "has disconnected",
                    time: (new Date()).toLocaleTimeString()
                });
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
                message: utils.joinMessage(),
                accepted: true,
                time: (new Date()).toLocaleTimeString()
            });
            
        });

        socket.on("sendMessage", data => {
            if (socket.id in users) {
                io.sockets.emit("broadcastMessage", {
                    name: users[socket.id].name,
                    color: users[socket.id].color,
                    message: data,
                    time: (new Date()).toLocaleTimeString()
                });
            }
        });

        socket.on("changeDimensions", dimensions => {
            railMap.transformTest(dimensions.width, dimensions.height);
            console.log(railMap.encode());
            io.sockets.emit("newMap", {
                height: dimensions.height,
                width: dimensions.width,
                map: railMap.encode()
            });
        });
    });
}