var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, document.getElementById('elemental_game'));
// var config = {
//   width: 1000,
//   height: 1000,
//   renderer: Phaser.AUTO,
//   parent: 'elemental_game',
//   forceSetTimeOut: true
// }
// var game = new Phaser.Game(config);

game.state.add('game', gameState);

game.state.start('game');
