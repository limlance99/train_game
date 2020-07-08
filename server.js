const app = require('express')();
const http = require('http').Server(app);
const io = require("socket.io")(http);
const rail = require('./backend/rail');
// const matrix = require('./backend/matrix');
const port = 3000;

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

app.get('/js/:pageValue', (req, res) => {
    const file = req.params.pageValue;
    res.sendFile(__dirname + '/frontend/dist/js/' + file);
});

http.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

const railMap = new rail.RailMap();
const users = {};
const map = [];
const actionHistory = [];

socket.init(io, map, users, actionHistory, railMap);
// matrix.init(io, map, actionHistory);