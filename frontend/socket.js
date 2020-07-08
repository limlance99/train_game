var selectedRails = []

const socket = io();

const Socket = {
    sendRail: function(railID) {
        socket.emit("rail-clicked", railID);
    }
}

socket.on("start-up", data => {
    console.log(data);
    selectedRails = data;
    username = prompt("Enter a username");

    socket.emit("send-name", username);
});

socket.on("new-rail", data => {
    console.log(data.newHistory);
    vueApp.toggleRail(data.rail.id);
});

socket.on("broadcast-message", message => {
    console.log(message);
});