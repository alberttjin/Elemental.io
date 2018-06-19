var gameState = {};
var characters = {}
var basicAttacks = {};

gameState.init = function() {
  game.stage.disableVisibilityChange = true;
  //create group for all characters, basicAttacks
  characters.charactersGroup = game.add.group();
  basicAttacks.basicAttacksGroup = game.add.group();

  //initiate players
  characters.allPlayers = [];
  characters.currPlayer = {};

  //initiate basicAttack
  basicAttacks.nextFire = 0;
  basicAttacks.delay = 500;
  basicAttacks.speed  = 540;
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
  characters.charactersGroup.enableBody = true;
  basicAttacks.basicAttacksGroup.enableBody = true;
  basicAttacks.basicAttacksGroup.setAll('outOfBoundsKill', true);

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
  console.log(hitPlayer)

  //fire basic attack upon click
  if (game.input.activePointer.isDown) {
    fireBasicAttack(
      'doritos',
      characters.currPlayer.x,
      characters.currPlayer.y,
      game.input.mousePointer.x,
      game.input.mousePointer.y
    );
  }
};
