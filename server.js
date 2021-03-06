const app = require('express')();
const http = require('http').Server(app);
const io = require("socket.io")(http);
const rail = require('./backend/rail');
const socket = require('./backend/socket');
const action = require('./backend/action');
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/dist/index.html');
});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(__dirname + '/frontend/dist/favicon.ico');
});

app.get('/css/:pageValue', (req, res) => {
    const file = req.params.pageValue;
    res.sendFile(__dirname + '/frontend/dist/css/' + file);
});

app.get('/img/:pageValue', (req, res) => {
    const file = req.params.pageValue;
    res.sendFile(__dirname + '/frontend/dist/img/' + file);
});

app.get('/js/:pageValue', (req, res) => {
    const file = req.params.pageValue;
    res.sendFile(__dirname + '/frontend/dist/js/' + file);
});

http.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

let railMap = new rail.RailMap(3, 3);
let users = {};
let actionHistory = [];

socket.init(io, railMap, users, actionHistory);