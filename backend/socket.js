const utils = require('./utils');
const rail = require('./rail');

module.exports.init = (io, railMap, users, actionHistory) => {
    let frozen = false;
    io.on("connection", socket => {
        socket.emit("startUp", {
            map: railMap.encode(), 
            actionHistory: actionHistory
        });

        socket.on("disconnect", data => {
            if (socket.id in users) {
                io.sockets.emit("userLeft", {
                    name: users[socket.id].name,
                    color: users[socket.id].color,
                    message: "has disconnected"
                });
            }
        });

        socket.on("railClicked", data => {
            if (socket.id in users) {
                let railID = data.id;
                let placed = data.placed;

                railMap.add(new rail.Rail(railID, users[socket.id].color, 3), placed);
                action = {
                    name: users[socket.id].name,
                    color: users[socket.id].color,
                    message: `clicked rail ${railID}`
                };
                io.sockets.emit("newRail", {
                    rail: {
                        id: railID,
                        color: railMap.enabled(railID) ? users[socket.id].color : "#FFFFFF"
                    },
                    newHistory: action
                });
                actionHistory.push(action);
            }
        });

        socket.on("goClicked", data => {
            frozen = true;
            action = {
                name: users[socket.id].name,
                color: users[socket.id].color,
                message: `started the train`
            };
            io.sockets.emit("moveTrain", {
                directions: railMap.solve(),
                newHistory: action
            });
            actionHistory.push(action);
        });

        socket.on("trainStop", data => {
            console.log(data);
        });

        socket.on("sendName", name => {
            // console.log(name)
            users[socket.id] = {
                name: name,
                color: utils.chooseRandomColor()
            };

            message = `${users[socket.id].name} ${utils.joinMessage()}`;
            io.sockets.emit("sendUser", {
                name: users[socket.id].name,
                color: users[socket.id].color,
                message: utils.joinMessage(),
                accepted: true
            });
        });

        socket.on("sendMessage", data => {
            if (socket.id in users) {
                io.sockets.emit("broadcastMessage", {
                    name: users[socket.id].name,
                    color: users[socket.id].color,
                    message: data
                });
            }
        });
    });
}