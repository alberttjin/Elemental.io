var game = new Phaser.Game(800, 600, Phaser.AUTO, document.getElementById('elemental_game'));

game.state.add('game', gameState);

game.state.start('game');
