// const matrix = require('./matrix');
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
                message = `${users[socket.id].name} has disconnected`;
                io.sockets.emit("broadcastMessage", message);
            }
        });

        // socket.on("railClicked", railID => {
        //     if (socket.id in users) {
        //         let newColor = matrix.updateMap(railID, users[socket.id].color, map);

        //         action = `${users[socket.id].name} clicked rail ${railID}`;
        //         rail = {
        //             id: railID,
        //             color: colors[socket.id]
        //         }

        //         io.sockets.emit("newRail", {
        //             rail: {
        //                 id: railID,
        //                 color: newColor
        //             },
        //             newHistory: action
        //         });
        //         actionHistory.push(action);
        //         console.log(action);
        //     }
        // });

        socket.on("railClicked", railID => {
            if (socket.id in users) {
                action = `${users[socket.id].name} clicked rail ${railID}`;
                railMap.add(new rail.Rail(railID, users[socket.id].color, 3));

                io.sockets.emit("newRail", {
                    rail: {
                        id: railID,
                        color: railMap.rails[railID].enabled ? users[socket.id].color : "0xFFFFFF"
                    },
                    newHistory: action
                });
                actionHistory.push(action);
            }
        });

        socket.on("goClicked", data => {
            frozen = true;
            io.sockets.emit("trainPath", railMap.solve());
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
            io.sockets.emit("sendUser", message);
        });

        socket.on("sendMessage", data => {
            if (socket.id in users) {
                message = `${users[socket.id].name}: ${data}`;
                io.sockets.emit("broadcastMessage", message);
            }
        });
    });
}