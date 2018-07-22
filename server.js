const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');

const PORT = process.env.PORT || 2000;

const namespace = '/';
const roomPrefix = 'room-';
const maxPlayers = 4;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});
app.use(express.static(__dirname + "/Client"));

var socketToRoomNum = new Map();
var stack = [1];
io.on('connection', (socket) => {
	var nextAvailiableRoom = stack.pop();
	if (io.nsps[namespace].adapter.rooms[roomPrefix + nextAvailiableRoom] &&
		io.nsps[namespace].adapter.rooms[roomPrefix + nextAvailiableRoom].length == maxPlayers) {
			nextAvailiableRoom ++;
		}
	socket.join(roomPrefix + nextAvailiableRoom);
	socketToRoomNum.set(socket.id, nextAvailiableRoom);
	stack.push(nextAvailiableRoom);
	console.log(`Socket (${socket.id}) has joined room ${nextAvailiableRoom}`);

  socket.on('newPlayer', function(data) {
    socket.to(getRoomNum(socket.id)).emit('playerJoined', data);
  });

  socket.on('currentPlayerData', function(data) {
    socket.to(data.newId).emit('addPlayer', data);
  });

  socket.on('disconnect', () => {
		var socketRoom = socketToRoomNum.get(socket.id);
		console.log(`Socket (${socket.id}) has left room ${nextAvailiableRoom}`);
		socketToRoomNum.delete(socket.id);
		stack.push(socketRoom);
	});
	
	socket.on('moving', (directionInfo) => {
		socket.to(getRoomNum(socket.id)).emit('updateModelVelocity', socket.id, directionInfo);
	})
});

http.listen(PORT, function() {
	console.log(`Listening on port: ${PORT}`);
});

function getRoomNum(socketId) {
  return roomPrefix + socketToRoomNum.get(socketId);
}
