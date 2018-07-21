var socket = io();
console.log(socket)

socket.on('connect', function() {
	console.log('Connected to the server.');
})

socket.on('disconnect', function() {
	console.log('Disconnected from the server.');
});
