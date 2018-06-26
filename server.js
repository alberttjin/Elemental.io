const express = require('express');
const socketIO = require('socket.io');

const path = require('path');
const http = require('http');

const app = express();

var server = http.createServer(app);
var io = socketIO(server);

const PORT = process.env.PORT || 8081;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

io.on('connection', (socket) => {
  console.log('New User Connected.');

  socket.on('disconnect', () => {
    console.log('User was disconnected.');
  });
});

server.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
