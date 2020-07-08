utils = require('./utils');

module.exports.init = (io, users, actionHistory, railMap) => {
    const fakeMap = {
        "0": {
            id: "0-0",
            color: "#343434",
        },
        "1": {
            id: "1-3",
            color: "#B1B1FF",
        },
        "4": {
            id: "4-2",
            color: "#B1B1FF",
        },
        "5": {
            id: "5-2",
            color: "#B1B1FF",
        }
    };

    io.on("connection", socket => {
        socket.emit("startUp", {
            map: railMap, 
            actionHistory: actionHistory
        });

        socket.on("disconnect", data => {
            message = `${names[socket.id]} has disconnected`
            socket.broadcast.emit("broadcast-message", message);
            messageHistory.push(message);
            console.log(message);
        });

        socket.on("railClicked", railID => {
            action = `${names[socket.id]} clicked rail ${railID}`;
            rail = {
                id: railID,
                color: colors[socket.id]
            }

            socket.broadcast.emit("newRail", {
                rail: {
                    id: railID,
                    color: colors[socket.id]
                },
                newHistory: action
            });
            actionHistory.push(action);
            console.log(action);
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

            message = `${names[socket.id]} ${utils.joinMessage()}`;
            socket.broadcast.emit("broadcast-message", message);
            messageHistory.push(message);
            console.log(message);
        });

        socket.on("sendMessage", data => {
            message = `${names[socket.id]}: ${data}`;
            socket.broadcast("broadcast-message", message);
            messageHistory.push(message);
            console.log(message);
        });
    });
}