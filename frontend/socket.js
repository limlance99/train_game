const socket = io();
// import {rail_paths} from 'rail_paths.js'

const Socket = {
    sendRail: function(id) {
        console.log("rail-clicked", rail_paths[id]);
        socket.emit("rail-clicked", rail_paths[id]);
    }
}

const clicked = [];

socket.on("start-up", data => {
    username = prompt("Enter a username");

    socket.emit("send-name", username);
});

socket.on("new-rail", rail => {
    console.log(rail);
});

socket.on("broadcast-message", message => {
    console.log(message);
});