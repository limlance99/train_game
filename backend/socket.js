const matrix = require('./matrix');
const utils = require('./utils');

module.exports.init = (io, map, users, actionHistory, railMap) => {
    io.on("connection", socket => {
        socket.emit("startUp", {
            map: railMap, 
            actionHistory: actionHistory
        });

        socket.on("disconnect", data => {
            if (socket.id in users) {
                socket.broadcast.emit("userLeft", users[socket.id].name);
            }
        });

        socket.on("railClicked", railID => {
            if (socket.id in users) {
                let newColor = matrix.updateMap(railID, users[socket.id].color, map);

                action = `${users[socket.id].name} clicked rail ${railID}`;

                socket.broadcast.emit("newRail", {
                    rail: {
                        id: railID,
                        color: newColor
                    },
                    newHistory: action
                });
                actionHistory.push(action);
                console.log(action);
            }
        });

        socket.on("goClicked", data => {
            console.log(data);
        });

        socket.on("trainStop", data => {
            console.log(data);
        });

        socket.on("sendName", name => {
            users[socket.id] = {
                name: name,
                color: utils.chooseRandomColor()
            };

            message = `${users[socket.id].name} ${utils.joinMessage()}`;
            socket.broadcast.emit("broadcastMessage", message);
        });

        socket.on("sendMessage", data => {
            console.log("sendMessage");
            if (socket.id in users) {
                message = `${users[socket.id].name}: ${data}`;
                socket.emit("broadcastMessage", message);
                socket.broadcast.emit("broadcastMessage", message);
            }
        });
    });
}