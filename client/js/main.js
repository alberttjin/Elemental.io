var game = new Phaser.Game(2000, 1500, Phaser.AUTO, document.getElementById('elemental_game'));

game.state.add('game', gameState);

game.state.start('game');
