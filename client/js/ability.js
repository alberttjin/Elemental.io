function initializeBasicAttack(type, nextFire, delay, speed) {
  basicAttacks.basicAttacksGroup = game.add.group();
  basicAttacks.nextFire = nextFire;
  basicAttacks.delay = delay;
  basicAttacks.speed  = speed;
}

function setBasicAttackPhysics() {
  basicAttacks.basicAttacksGroup.enableBody = true;
  basicAttacks.basicAttacksGroup.setAll('checkWorldBounds', true);
  basicAttacks.basicAttacksGroup.setAll('outOfBoundsKill', true);
}

function fireBasicAttack(type, startX, startY, destX, destY) {
  if (game.time.now > basicAttacks.nextFire) {
    basicAttacks.nextFire = game.time.now + basicAttacks.delay;

    var attack = basicAttacks.basicAttacksGroup.create(startX, startY, type);
    attack.scale.setTo(0.25, 0.25)

    game.physics.arcade.moveToXY(attack, destX, destY, basicAttacks.speed);
  }
}
