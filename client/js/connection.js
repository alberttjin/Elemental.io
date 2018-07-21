var socket = io();

socket.on('connect', function() {
	console.log('Connected to the server.');
	savePlayerId(socket.id)
})

socket.on('disconnect', function() {
	console.log('Disconnected from the server.');
});
