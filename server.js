const app = require('express')();
const http = require('http').Server(app);
const io = require("socket.io")(http);
const socket = require('./backend/socket')
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

app.get('/client/socket', (req, res) => {
    res.sendFile(__dirname + '/frontend/socket.js');
});

app.get('/style', (req, res) => {
    res.sendFile(__dirname + '/frontend/style.css');
});

http.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

const users = {};
const actionHistory = [];

socket.init(io, users, actionHistory, 0);