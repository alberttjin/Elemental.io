function initializeCharacters() {
  characters.charactersGroup = game.add.group();
  characters.allPlayers = [];
  characters.currPlayer = {};
}

function addCharacter(id, x, y, type, name) {
  const newChar = characters.charactersGroup.create(x, y, type);
  newChar.id = id;
  newChar.scale.setTo(0.25, 0.25)
  newChar.setHealth(3);
  newChar.type = type;
  characters.allPlayers[id] = newChar;
  return newChar;
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
