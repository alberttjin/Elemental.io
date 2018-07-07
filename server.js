const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

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

  	socket.on('disconnect', () => {
		var socketRoom = socketToRoomNum.get(socket.id);
		console.log(`Socket (${socket.id}) has left room ${nextAvailiableRoom}`);
		socketToRoomNum.delete(socket.id);
		stack.push(socketRoom);
  });
});

http.listen(PORT, function() {
	console.log(`Listening on port: ${PORT}`);
});
