/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import Phaser from 'phaser';
import Human from '../Objects/Human';

export default class GameScene extends Phaser.Scene {
  constructor(scene, background, enemy, nextScene, selfScale = 1) {
    super(scene);
    this.scene = scene;
    this.enemy = enemy;
    this.selfScale = selfScale;
    this.background = background;
    this.nextScene = nextScene;
    this.humansCollected = 0;
    // this.gameOptions = {
    //   platformSpeedRange: [100, 100],
    //   // space between the rightside platforms
    //   spawnRange: [80, 100],
    //   // platforms size
    //   platformSizeRange: [100, 300],
    //   // height between rightside platform and next platform
    //   platformHeightRange: [-5, 5],
    //   // a scale to be multiplied by platformHeightRange
    //   platoformHeighScale: 20,
    //   // platform max && min height
    //   platformVerticalLimit: [0.4, 0.8],
    // };
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.add.image(400, 200, this.background).setScrollFactor(1, 0);

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

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('zombie', {
        start: 8,
        end: 10,
      }),
      frameRate: 8,
      repeat: -1,
    });

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

    this.anims.create({
      key: 'move',
      frames: this.anims.generateFrameNumbers('human', {
        start: 19,
        end: 22,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: 'fMove',
      frames: this.anims.generateFrameNumbers('female', {
        start: 19,
        end: 22,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.physics.add.collider(this.platforms, this.humans);

    this.physics.add.overlap(
      this.player,
      this.humans,
      this.handleCollectHumans,
      undefined,
      this,
    );

    const style = { color: '#fff', fontSize: '24px' };
    this.humansCollectedText = this.add.text(240, 10, 'Humans Slaughtered: 0', style)
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
      this.player.anims.play('jump');
      this.sound.play('jump');
    }

    if (this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    this.horizontalWrap(this.player);

    this.changeScene();

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
    human.anims.play('move');
    this.add.existing(human);

    human.body.setSize(human.width, human.height);

    this.physics.world.enable(human);

    return human;
  }

  handleCollectHumans(player, human) {
    this.humans.killAndHide(human);
    if (this.humansCollected % 4 === 0) {
      this.sound.play('killHim');
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

  changeScene() {
    if (this.humansCollectedText === 4) {
      this.scene.start('Dialog2');
      this.humansCollectedText = 3;
    } else if (this.humansCollected === 2) {
      this.scene.start('Dialog1');
      this.humansCollectedText = 2;
    }
  }
}