/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import Phaser from 'phaser';
import Human from '../Objects/Human';
import gameOpt from '../config/gameOptions';

export default class GameScene extends Phaser.Scene {
  constructor(scene, background, enemy, nextScene) {
    super(scene);
    this.selfScene = scene;
    this.enemy = enemy;
    this.background = background;
    this.nextScene = nextScene;
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    if (this.selfScene === 'First') {
      gameOpt.gameOptions.currentScene = 1;
      this.speedIncrease = gameOpt.gameOptions.firstSceneSpeed;
    } else if (this.selfScene === 'Second') {
      gameOpt.gameOptions.currentScene = 2;
      this.speedIncrease = gameOpt.gameOptions.secondSceneSpeed;
    } else {
      gameOpt.gameOptions.currentScene = 3;
      this.speedIncrease = gameOpt.gameOptions.thirdSceneSpeed;
    }
    this.add.image(800, 600, this.background).setScrollFactor(1, 0);

    this.platforms = this.physics.add.staticGroup();
    if (gameOpt.gameOptions.currentScene === 1) {
      for (let i = 0; i < 5; i++) {
        const x = Phaser.Math.Between(80, 400);
        const y = 150 * i;

        const platform = this.platforms.create(x, y, 'platform');
        platform.scale = 0.5;

        const { body } = platform;
        body.updateFromGameObject();
      }
    } else if (gameOpt.gameOptions.currentScene === 2) {
      for (let i = 0; i < 5; i++) {
        const x = Phaser.Math.Between(50, 450);
        const y = 150 * i;

        const platform = this.platforms.create(x, y, 'platform2');
        platform.scale = 0.5;

        const { body } = platform;
        body.updateFromGameObject();
      }
    } else if (gameOpt.gameOptions.currentScene === 3) {
      for (let i = 0; i < 5; i++) {
        const x = Phaser.Math.Between(150, 500);
        const y = 150 * i;
        const platform = this.platforms.create(x, y, 'platform3');
        platform.scale = 0.5;

        const { body } = platform;
        body.updateFromGameObject();
      }
    }

    this.player = this.physics.add.sprite(240, 320, 'zombie').setScale(0.5);

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('zombie', {
        start: 8,
        end: 10,
      }),
      frameRate: 6,
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
    this.humans.get(240, 0, 'human');

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
      frames: this.anims.generateFrameNumbers('woman', {
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
    this.humansCollectedText = this.add.text(240, 10, `Humans Slaughtered: ${gameOpt.gameOptions.score}`, style)
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
        if (human.y >= scrollY + 800) {
          human.y = scrollY - Phaser.Math.Between(50, 100);
          human.body.updateFromGameObject();
        }
      });
    });
    const touchingDown = this.player.body.touching.down;

    if (touchingDown) {
      this.player.setVelocityY(-300);
      this.player.anims.play('jump');
      this.sound.play('jump');
    }

    // const vy = this.player.body.velocity.y;
    // if (vy > 0 && this.player.texture.key !== 'zombie') {
    //   this.player.setTexture('zombie');
    // }

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
    if (gameOpt.gameOptions.score % 4 === 0) {
      this.sound.play('killHim');
    }

    this.physics.world.disableBody(human.body);

    gameOpt.gameOptions.score += 1;
    const value = `Humans Slaughtered: ${gameOpt.gameOptions.score}`;
    this.humansCollectedText.text = value;
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
    if (gameOpt.gameOptions.score === 2 && this.selfScene === 'First') {
      this.scene.start('Dialog1');
    } else if (gameOpt.gameOptions.score === 4 && this.selfScene === 'Second') {
      this.scene.start('Dialog2');
    } else if (gameOpt.gameOptions.score === 5 && this.selfScene === 'Third') {
      this.scene.start('rexUI');
    }
  }
}
