var selectedRails = []

const socket = io();
// import {rail_paths} from 'rail_paths.js'


const Socket = {
    sendRail: function(id) {
        console.log("rail-clicked", rail_paths[id]);
        socket.emit("rail-clicked", rail_paths[id]);
    }
}

socket.on("start-up", data => {
    console.log(data);
    selectedRails = data;
})

socket.on("new-rail", rail => {
    console.log(rail);
})