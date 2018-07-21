function initializeBasicAttack(type, nextFire, delay, speed) {
  basicAttacks.basicAttacksGroup = game.add.group();
  basicAttacks.enemyBasicAttacksGroup = game.add.group();
  basicAttacks.nextFire = nextFire;
  basicAttacks.delay = delay;
  basicAttacks.speed  = speed;
}

function setBasicAttackPhysics() {
  const ba = basicAttacks.basicAttacksGroup
  ba.enableBody = true;
  ba.createMultiple(30, 'doritos', 0, false)
  ba.setAll('checkWorldBounds', true);
  ba.setAll('outOfBoundsKill', true);

  basicAttacks.enemyBasicAttacksGroup.enableBody = true;
  basicAttacks.enemyBasicAttacksGroup.setAll('checkWorldBounds', true);
  basicAttacks.enemyBasicAttacksGroup.setAll('outOfBoundsKill', true);
}

function fireBasicAttack(type, startX, startY, destX, destY) {
  if (game.time.now > basicAttacks.nextFire) {
    basicAttacks.nextFire = game.time.now + basicAttacks.delay;

    var attack = basicAttacks.basicAttacksGroup.getFirstExists(false);
    attack.scale.setTo(0.25, 0.25)
    attack.reset(startX, startY)

    game.physics.arcade.moveToXY(attack, destX, destY, basicAttacks.speed);
  }
}
