/*
Schema:
gameState: phaser state for the actual game
  methods:
    init: initialize game state
    preload: preload images/sprites
    create: create objects/add physics
    update: called every frame when game updates

characters: object for all character related things
  attributes:
    charactersGroup: the phaser group of characters, use this group to create a character
    allPlayers: object where keys are ids of players and objects are actual the actual players
    currPlayer: the current player on this client
    id: temp id
    x: temp x
    y: temp y
    type: temp type
    name: temp name

basicAttacks: object for all basic attack related thigns
  attributes:
    basicAttacksGroup: phaser group of basic attacks
    nextFire: the time at which the person is allowed to fire again
    delay: the delay between fires, used to calculate nextFire
    speed: speed of basic attack
*/

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
  game.load.image('doritos','../assets/sprites/doritos-cool-ranch.png');
  game.load.tilemap('map', '../assets/tilemaps/newForestMap.json', null, Phaser.Tilemap.TILED_JSON);
  //game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
  game.load.image('tiles', '../assets/images/forest_tiles.png');
  game.load.image('sky', '../assets/images/sky.jpeg');
};

gameState.create = function() {
	// bg = game.add.tileSprite(0, 0, 2000, 1000, 'sky');
	// game.world.sendToBack(bg);
	// game.world.setBounds(0, 0, 2000, 1000);
	map = this.game.add.tilemap('map');
	map.addTilesetImage('newForestTileset', 'tiles');
	layer = map.createLayer('Tile Layer 1')
	layer.resizeWorld();
	game.world.sendToBack(map)
	game.world.sendToBack(layer)


	//start physics and enable physics for all characters
	game.physics.startSystem(Phaser.Physics.ARCADE);
	setCharacterPhysics();
	setBasicAttackPhysics();

	//add character and enemy character for testing
	characters.currPlayer = addCharacter(
	characters.id,
	characters.x,
	characters.y,
	characters.type,
	characters.name
	);
	console.log(characters.schema)
	addFromSchema();
	//set locked camera
	game.camera.follow(characters.currPlayer);

	//set controls
  setControls();
};


gameState.update = function() {

  //set player collision
  var hitPlayer = game.physics.arcade.collide(characters.charactersGroup, characters.charactersGroup)

  //fire basic attack upon click
  if (game.input.activePointer.isDown) {
    fireBasicAttack(
      'doritos',
      characters.currPlayer.x,
      characters.currPlayer.y,
      game.input.activePointer.worldX,
      game.input.activePointer.worldY
    );
  }
};
