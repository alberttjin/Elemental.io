var gameState = {};
var currPlayer = {};
var allPlayers = {};
var controls;

gameState.init = function() {
  game.stage.disableVisibilityChange = true;
  characters = game.add.group();
};

gameState.preload = function() {
  //game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
  //game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
  game.load.image('doritos','../assets/sprites/doritos-cool-ranch.png');
};

gameState.create = function() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  currPlayer = addCharacter(1, 0, 0, 'doritos');
  allPlayers[2] = (addCharacter(2, 0, 0, 'doritos'));
  console.log(allPlayers)
  game.physics.arcade.enable(currPlayer);

  controls = setWASD();
};

gameState.update = function() {
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
};
