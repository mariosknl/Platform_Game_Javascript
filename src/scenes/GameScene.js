/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import Phaser from 'phaser';
import Human from '../Objects/Human';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.humansCollected = 0;
  }

  init() {
    this.humansCollected = 0;
  }

  preload() {
    // load images
    this.load.image('logo', '../src/assets/logo.png');
    this.load.image('background', '../src/assets/background.jpg');
    this.load.image('platform', '../src/assets/ground_grass.png');
    this.load.image('zombie', '../src/assets/zombie_cheer1.png');
    this.load.image('human', '../src/assets/soldier_walk1.png');
    this.load.image('zombie2', '../src/assets/zombie_cheer2.png');
    this.load.audio('jump', '../src/assets/audio/footstep_grass_001.mp3');
    this.load.audio('death', '../src/assets/audio/death.mp3');
    this.load.audio('killHim', '../src/assets/audio/kill_him.mp3');
    this.load.audio('killHer', '../src/assets/audio/kill_her.mp3');
    this.load.audio('loser', '../src/assets/audio/loser.mp3');

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.add.image(800, 600, 'background').setScrollFactor(1, 0);

    this.platforms = this.physics.add.staticGroup();

    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;

      const platform = this.platforms.create(x, y, 'platform');
      platform.scale = 0.5;

      const { body } = platform;
      body.updateFromGameObject();
    }

    this.player = this.physics.add.sprite(240, 320, 'zombie').setScale(0.5);

    this.physics.add.collider(this.platforms, this.player);

    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    this.cameras.main.startFollow(this.player);

    this.cameras.main.setDeadzone(this.scale.width * 1.5);

    this.humans = this.physics.add.group({
      classType: Human,
    });
    this.humans.get(240, 320, 'human');

    this.physics.add.collider(this.platforms, this.humans);

    this.physics.add.overlap(
      this.player,
      this.humans,
      this.handleCollectHumans,
      undefined,
      this,
    );

    const style = { color: '#fff', fontSize: '24px' };
    this.humansCollectedText = this.add.text(240, 10, 'Humans Eaten: 0', style)
      .setScrollFactor(0)
      .setOrigin(0.5, 0);
  }

  update() {
    this.platforms.children.iterate(child => {
      const platform = child;

      const { scrollY } = this.cameras.main;
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100);
        platform.body.updateFromGameObject();

        this.addHumanAbove(platform);
      }

      this.humans.children.iterate(child => {
        const human = child;

        const { scrollY } = this.cameras.main;
        if (human.y >= scrollY + 700) {
          human.y = scrollY - Phaser.Math.Between(50, 100);
          human.body.updateCenter();
        }
      });
    });

    const touchingDown = this.player.body.touching.down;

    if (touchingDown) {
      this.player.setVelocityY(-300);
      this.player.setTexture('zombie2');
      this.sound.play('jump');
    }

    const vy = this.player.body.velocity.y;
    if (vy > 0 && this.player.texture.key !== 'zombie') {
      this.player.setTexture('zombie');
    }

    if (this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    this.horizontalWrap(this.player);

    const bottomPlatform = this.findBottomMostPlatform();
    if (this.player.y > bottomPlatform.y + 200) {
      this.scene.start('game-over');
      this.sound.play('death');
      this.sound.play('loser');
    }
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

  addHumanAbove(sprite) {
    const y = sprite.y - sprite.displayHeight;

    const human = this.humans.get(sprite.x, y, 'human');

    human.setActive(true);
    human.setVisible(true);

    this.add.existing(human);

    human.body.setSize(human.width, human.height);

    this.physics.world.enable(human);

    return human;
  }

  handleCollectHumans(player, human) {
    this.humans.killAndHide(human);
    if (this.humansCollected % 3 === 0) {
      this.sound.play('killHim');
    } else if (this.humansCollected % 4 === 0) {
      this.sound.play('killHer');
    }

    this.physics.world.disableBody(human.body);

    const value = `Humans Eaten: ${this.humansCollected}`;
    this.humansCollectedText.text = value;

    this.humansCollected += 1;
  }

  findBottomMostPlatform() {
    const platforms = this.platforms.getChildren();
    let bottomPlatform = platforms[0];

    for (let i = 1; i < platforms.length; i += 1) {
      const platform = platforms[i];

      if (platform.y < bottomPlatform.y) {
        continue;
      }
      bottomPlatform = platform;
    }
    return bottomPlatform;
  }
}