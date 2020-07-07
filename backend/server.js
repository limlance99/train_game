const io = require("socket.io")(3000)

io.on("connection", socket => {
    console.log("Connected");
    socket.emit("start-up");
    socket.on("rail-clicked", data => {
        console.log(data);
    })
})