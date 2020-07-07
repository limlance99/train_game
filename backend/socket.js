utils = require('./utils');

module.exports.init = (io, names, actionHistory, messageHistory) => {
    const fakeMap = [
        {
            id: "0-0",
            color: "#343434",
        },
        {
            id: "1-3",
            color: "#343434",
        },
        {
            id: "4-2",
            color: "#343434",
        },
        {
            id: "5-2",
            color: "#343434",
        }

    ]

    const fakeHistory = [
        "Lance added rail 0-0",
        "Keith added rail 3-3",
        "Gene removed rail 3-3",
        "Lexi pressed Go!",
    ]

    io.on("connection", socket => {
        console.log("Connected");
        socket.emit("start-up", {
            map: fakeMap, 
            history: fakeHistory,
        });

        socket.on("rail-clicked", data => {
            console.log(data);
            fakeRail = {
                id: "0-2",
                color: "#00c6d7"
            }
            fakeHistoryString = `${socket.id} clicked rail ${data}`
            socket.emit("new-rail", {
                rail: fakeRail,
                history: fakeHistoryString,
            });
            socket.broadcast.emit("new-rail", {
                rail: fakeRail,
                history: fakeHistoryString,
            });
        });

        socket.on("go-clicked", data => {
            console.log(data);
        });

        socket.on("train-stop", data => {
            console.log(data);
        });

        socket.on("send-name", data => {
            names[socket.id] = data;
            message = `${names[socket.id]} ${utils.joinMessage()}`;
            socket.broadcast("broadcast-message", message);
            messageHistory.push(message);
        });

        socket.on("send-message", data => {
            message = `${names[socket.id]}: ${data}`;
            socket.broadcast("broadcast-message", message);
            messageHistory.push(message);
        });
    });
}