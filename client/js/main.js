var game = new Phaser.Game('100', '100', Phaser.AUTO, document.getElementById('elemental_game'));

game.state.add('game', gameState);

game.state.start('game');
