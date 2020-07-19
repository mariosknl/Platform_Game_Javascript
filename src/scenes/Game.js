import Phaser from 'phaser';
import Carrot from '../game/Carrot';

export default class Game extends Phaser.Scene {
  player() {}

  platforms() {}

  cursors() {}

  carrots() {}

  constructor() {
    super('game');
  }

  preload() {
    this.load.image('background', '../src/assets/bg_layer1.png');
    this.load.image('platform', '../src/assets/ground_grass.png');
    this.load.image('bunny-stand', '../src/assets/bunny1_stand.png');
    this.load.image('carrot', '../src/assets/carrot.png');
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.add.image(240, 320, 'background').setScrollFactor(1, 0);

    this.platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 5; i += 1) {
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;

      const platform = this.platforms.create(x, y, 'platform');
      platform.scale = 0.5;

      const { body } = platform;
      body.updateFromGameObject();
    }

    this.player = this.physics.add.sprite(240, 320, 'bunny-stand').setScale(0.5);

    this.physics.add.collider(this.platforms, this.player);

    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    this.cameras.main.startFollow(this.player);

    this.cameras.main.setDeadzone(this.scale.width * 1.5);

    this.carrots = this.physics.add.group({
      classType: Carrot,
    });
    this.carrots.get(240, 320, 'carrot');

    this.physics.add.collider(this.platforms, this.carrots);
  }

  update(t, dt) {
    this.platforms.children.iterate(child => {
      const platform = child;

      const { scrollY } = this.cameras.main;
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100);
        platform.body.updateFromGameObject();

        this.addCarrotAbove(platform);
      }
    });

    const touchingDown = this.player.body.touching.down;

    if (touchingDown) {
      this.player.setVelocityY(-300);
    }
    if (this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    this.horizontalWrap(this.player);
  }

  horizontalWrap(sprite) {
    const halfWidth = sprite.displayWidth * 0.5;
    const gameWidth = this.scale.width;

    if (sprite.x < -halfWidth) {
      sprite.x = gameWidth + halfWidth;
    } else if (sprite.x > gameWidth + halfWidth) {
      sprite.x = -halfWidth;
    }
  }

  addCarrotAbove(sprite) {
    const y = sprite.y - sprite.displayHeight;

    const carrot = this.carrots.get(sprite.x, y, 'carrot');

    this.add.existing(carrot);

    carrot.body.setSize(carrot.width, carrot.height);

    return carrot;
  }
}