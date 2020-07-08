const app = require('express')();
const http = require('http').Server(app);
const io = require("socket.io")(http);
const socket = require('./backend/socket')
const port = 8080;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

app.get('/client/socket', (req, res) => {
    res.sendFile(__dirname + '/frontend/socket.js');
});

app.get('/client/constants', (req, res) => {
    res.sendFile(__dirname + '/frontend/constants/rail_paths.js');
});

app.get('/style', (req, res) => {
    res.sendFile(__dirname + '/frontend/style.css');
});

http.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

const names = {};
const colors = {};
const actionHistory = [];
const messageHistory = [];

socket.init(io, names, actionHistory, messageHistory, colors);