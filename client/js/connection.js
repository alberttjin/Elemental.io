var socket = io();

socket.on('connect', function() {
	console.log('Connected to the server.');
	sendAndStoreInitialData("alden")
});

socket.on('playerJoined', function(data) {
    addCharacter(data.id, data.x, data.y, data.type, data.name);
    console.log(characters);
	const player = characters.currPlayer;
	socket.emit('currentPlayerData', {
		newId: data.id,
		id: player.id,
		x: player.x,
		y: player.y,
		type: player.type,
		name: player.name
	});
});

socket.on('playerLeft', function(socketID) {
    removeCharacter(socketID);
});

socket.on('addPlayer', function(data) {
	console.log(characters)
	addToSchema(data);
});

socket.on('disconnect', function() {
	console.log('Disconnected from the server.');
});

socket.on('updateModelVelocity', (whichSocketID, directionInfo) => {
	console.log(directionInfo.direction);
	var requester = characters.allPlayers[whichSocketID];

	switch (directionInfo.direction) {
		case 'up':
		move(requester.body, 0, -Y_VELOCITY);
		break;

		case 'down':
		move(requester.body, 0, Y_VELOCITY);
		break;

		case 'left':
		move(requester.body, -X_VELOCITY, 0);
		break;

		case 'right':
		move(requester.body, X_VELOCITY, 0);
		break;

		case 'stop':
		move(requester.body, 0, 0);
		break;

	}

});

function requestUpdateMovement(directionInfo) {
	socket.emit('moving', directionInfo);
}

function sendAndStoreInitialData(playerName) {
	const types = ['ice_wizard', 'fire_wizard', 'water_wizard'];
	//const type = types[Math.floor(Math.random() * types.length)];
	const type = 'doritos';
	const x = game.world.centerX;
	const y = game.world.centerY;
	const name = playerName;
	savePlayerData(socket.id, x, y, type, name);
	socket.emit("newPlayer", {id: socket.id, x: x, y: y, type: type, name: name})
}
