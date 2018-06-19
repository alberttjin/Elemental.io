function fireBasicAttack(type, startX, startY, destX, destY) {
  if (game.time.now > basicAttacks.nextFire) {
    basicAttacks.nextFire += basicAttacks.delay;

    var attack = basicAttacks.basicAttacksGroup.create(startX, startY, type);
    attack.scale.setTo(0.25, 0.25)

    game.physics.arcade.moveToXY(attack, destX, destY, basicAttacks.speed);
  }
}
