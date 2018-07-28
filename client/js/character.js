function initializeCharacters() {
  characters.charactersGroup = game.add.group();
  characters.allPlayers = [];
  characters.currPlayer = {};
  characters.schema = [];
}

function addCharacter(id, x, y, type, name) {
  const newChar = characters.charactersGroup.create(x, y, type);
  newChar.id = id;
  newChar.scale.setTo(0.25, 0.25)
  newChar.setHealth(HEALTH);
  newChar.type = type;
  characters.allPlayers[id] = newChar;
  return newChar;
}

function addToSchema(schemaObject) {
  if (characters.schema === undefined) {
    characters.schema = [];
  }
  characters.schema.push(schemaObject);
}

function addFromSchema() {
  for (i = 0; i < characters.schema.length; i++) {
    const char = characters.schema[i];
    addCharacter(char.id, char.x, char.y, char.type, char.name);
  }
}

function damageCharacter() {

}

function savePlayerData(id, x, y, type, name) {
  characters.id = id;
  characters.x = x;
  characters.y = y;
  characters.type = type;
  characters.name = name;
}

function setCharacterPhysics(){
  characters.charactersGroup.enableBody = true;
  characters.charactersGroup.collideWorldBounds = true;
}

function setWASD() {
  var wasd = {
    up: game.input.keyboard.addKey(Phaser.KeyCode.W),
    down: game.input.keyboard.addKey(Phaser.KeyCode.S),
    left: game.input.keyboard.addKey(Phaser.KeyCode.A),
    right: game.input.keyboard.addKey(Phaser.KeyCode.D)
  }
  return wasd;
}

function setControls() {
  characters.controls = setWASD();
  const ctrls = characters.controls;

  ctrls.up.onDown.add(function() {
    sendMovementSignal('up', 0, -Y_VELOCITY);
  });

  ctrls.down.onDown.add(function() {
    sendMovementSignal('down', 0, Y_VELOCITY);
  });

  ctrls.left.onDown.add(function() {
    sendMovementSignal('left', -X_VELOCITY, 0);
  });

  ctrls.right.onDown.add(function() {
    sendMovementSignal('right', X_VELOCITY, 0);
  });

  ctrls.up.onUp.add(function() {
    sendMovementSignal('stop', 0, 0);
  });

  ctrls.down.onUp.add(function() {
    sendMovementSignal('stop', 0, 0);
  });

  ctrls.left.onUp.add(function() {
    sendMovementSignal('stop', 0, 0);
  });

  ctrls.right.onUp.add(function() {
    sendMovementSignal('stop', 0, 0);
  });
}

function sendMovementSignal(direction, xVelocity, yVelocity) {
  const ctrls = characters.controls;
  const stopMotion = ctrls.up.isUp && ctrls.down.isUp && ctrls.left.isUp && ctrls.right.isUp;
  if (direction === 'stop' && !stopMotion) {
    return;
  }
	requestUpdateMovement({
		direction: direction
	});
	move(characters.currPlayer.body, xVelocity, yVelocity);
}

// function sendStopSignal() {
//   requestUpdateMovement({
//     direction: 'stop',
//   });
//   move(characters.currPlayer.body, 0, 0);
// }

function move(body, xVelocity, yVelocity) {
  body.velocity.y = yVelocity;
  body.velocity.x = xVelocity;
}
