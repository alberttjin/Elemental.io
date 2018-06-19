function addCharacter(id, x, y, type, name) {
    const newChar = characters.charactersGroup.create(x, y, type);
    newChar.id = id;
    newChar.scale.setTo(0.25, 0.25)
    return newChar;
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
