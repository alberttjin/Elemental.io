var gameState = {};
var currPlayer = {};
var allPlayers = {};
var characters;
var controls;

gameState.init = function() {
  game.stage.disableVisibilityChange = true;
  //create group for all characters
  characters = game.add.group();

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
  characters.enableBody = true;

  //add character and enemy character for testing
  currPlayer = addCharacter(1, game.world.centerX, game.world.centerY, 'doritos');
  allPlayers[2] = (addCharacter(2, game.world.centerX + 50, game.world.centerY + 50, 'doritos'));

  //set locked camera
  game.camera.follow(currPlayer);

  //set controls
  controls = setWASD();
};

gameState.update = function() {
  //set movement controls
  if (controls.up.isDown) {
    currPlayer.body.velocity.y = -150;
    currPlayer.body.velocity.x = 0;
  } else if (controls.down.isDown) {
    currPlayer.body.velocity.y = 150;
    currPlayer.body.velocity.x = 0;
  } else if (controls.left.isDown) {
    currPlayer.body.velocity.x = -150;
    currPlayer.body.velocity.y = 0;
  } else if (controls.right.isDown) {
    currPlayer.body.velocity.x = 150;
    currPlayer.body.velocity.y = 0;
  } else {
    currPlayer.body.velocity.x = 0;
    currPlayer.body.velocity.y = 0;
  }

  //set player collision
  var hitPlayer = game.physics.arcade.collide(characters, characters)
  console.log(hitPlayer)
};
