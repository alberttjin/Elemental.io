var socket = io();

socket.on('connect', function() {
	console.log('Connected to the server.');
	sendAndStoreInitialData("alden")
});

socket.on('playerJoined', function(data) {
	addCharacter(data.id, data.x, data.y, data.type, data.name);
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
		moveUp(requester.body);
		break;

		case 'down':
		moveDown(requester.body);
		break;

		case 'left':
		moveLeft(requester.body);
		break;

		case 'right':
		moveRight(requester.body);
		break;

		case 'stop':
		stopMove(requester.body);
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
