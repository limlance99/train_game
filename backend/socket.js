utils = require('./utils');

module.exports.init = (io, users, actionHistory, railMap) => {
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