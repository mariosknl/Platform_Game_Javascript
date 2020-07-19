import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  player() {}

  platforms() {}

  constructor() {
    super('game');
  }

  preload() {
    this.load.image('background', '../src/assets/bg_layer1.png');
    this.load.image('platform', '../src/assets/ground_grass.png');
    this.load.image('bunny-stand', '../src/assets/bunny1_stand.png');
  }

  create() {
    this.add.image(240, 320, 'background');

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
  }

  update() {
    this.platforms.children.iterate(child => {
      const platform = child;

      const { scrollY } = this.cameras.main;
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100);
        platform.body.updateFromGameObject();
      }
    });

    const touchingDown = this.player.body.touching.down;

    if (touchingDown) {
      this.player.setVelocityY(-300);
    }
  }
}