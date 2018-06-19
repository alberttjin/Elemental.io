var gameState = {};
var characters = {}
var basicAttacks = {};

gameState.init = function() {
  game.stage.disableVisibilityChange = true;
  //initialize characters and attacks
  initializeCharacters();
  initializeBasicAttack('doritos', 0, 1000, 540);

};

gameState.preload = function() {
  //game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
  //game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
  game.load.image('sky', '../assets/images/sky.jpeg');
  game.load.image('doritos','../assets/sprites/doritos-cool-ranch.png');
};

gameState.create = function() {
  bg = game.add.tileSprite(0, 0, 2000, 1000, 'sky');
  game.world.sendToBack(bg);
  game.world.setBounds(0, 0, 2000, 1000);

  //start physics and enable physics for all characters
  game.physics.startSystem(Phaser.Physics.ARCADE);
  setCharacterPhysics();
  setBasicAttackPhysics();

  //add character and enemy character for testing
  characters.currPlayer = addCharacter(1, game.world.centerX, game.world.centerY, 'doritos');
  characters.allPlayers[2] = (addCharacter(2, game.world.centerX + 50, game.world.centerY + 50, 'doritos'));

  //set locked camera
  game.camera.follow(characters.currPlayer);

  //set controls
  characters.controls = setWASD();
};

gameState.update = function() {
  //set movement controls
  if (characters.controls.up.isDown) {

    characters.currPlayer.body.velocity.y = -150;
    characters.currPlayer.body.velocity.x = 0;

  } else if (characters.controls.down.isDown) {

    characters.currPlayer.body.velocity.y = 150;
    characters.currPlayer.body.velocity.x = 0;

  } else if (characters.controls.left.isDown) {

    characters.currPlayer.body.velocity.x = -150;
    characters.currPlayer.body.velocity.y = 0;

  } else if (characters.controls.right.isDown) {

    characters.currPlayer.body.velocity.x = 150;
    characters.currPlayer.body.velocity.y = 0;

  } else {

    characters.currPlayer.body.velocity.x = 0;
    characters.currPlayer.body.velocity.y = 0;

  }

  //set player collision
  var hitPlayer = game.physics.arcade.collide(characters, characters)

  //fire basic attack upon click
  if (game.input.activePointer.isDown) {
    console.log("mouse x" + game.input.activePointer.x)
    console.log("mouse y" + game.input.activePointer.y)
    fireBasicAttack(
      'doritos',
      characters.currPlayer.x,
      characters.currPlayer.y,
      game.input.activePointer.x,
      game.input.activePointer.y
    );
  }
};
