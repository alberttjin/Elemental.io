var gameState = {};

gameState.init = function(){
    game.stage.disableVisibilityChange = true;
};

gameState.preload = function() {
    //game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    //game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
    game.load.image('doritos','../assets/sprites/doritos-cool-ranch.png');
};

gameState.create = function(){
    game.add.sprite(0, 0, 'doritos');
};
