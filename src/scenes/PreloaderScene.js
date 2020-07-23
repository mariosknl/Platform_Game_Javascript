import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    // add logo image
    this.add.image(400, 200, 'logo');

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading....',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 5)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in the game
    this.load.image('startBtn', '../src/assets/ui/start.png');
    this.load.image('grey_button1', '../src/assets/ui/grey_button01.png');
    this.load.image('grey_button2', '../src/assets/ui/grey_button03.png');
    this.load.image('logo', '../src/assets/logo.png');
    this.load.image('check', '../src/assets/ui/check.png');
    this.load.image('check2', '../src/assets/ui/check2.png');
    this.load.image('introBg', '../src/assets/bg/background.jpg');
    this.load.image('bgTitle', '../src/assets/bg/bgTitle.jpg');
    this.load.image('background', '../src/assets/bg/background5.jpg');
    this.load.image('background2', '../src/assets/bg/background2.jpg');
    this.load.image('background3', '../src/assets/bg/background3.jpg');
    this.load.image('platform', '../src/assets/ground_grass.png');
    this.load.image('platform2', '../src/assets/sand.png');
    this.load.image('platform3', '../src/assets/snow.png');
    this.load.image('gameOver', '../src/assets/bg/gameOver.jpg');
    this.load.audio('bgMusic', '../src/assets/audio/intro.mp3');
    this.load.audio('jump', '../src/assets/audio/footstep_grass_001.mp3');
    this.load.audio('death', '../src/assets/audio/death.mp3');
    this.load.audio('killHim', '../src/assets/audio/kill_him.mp3');
    this.load.audio('loser', '../src/assets/audio/loser.mp3');

    this.load.spritesheet('zombie', '../src/assets/zombie_tilesheet.png', {
      frameWidth: 80,
      frameHeight: 110,
    });

    this.load.spritesheet('human', '../src/assets/player_tilesheet.png', {
      frameWidth: 80,
      frameHeight: 110,
    });

    this.load.spritesheet('woman', '../src/assets/female_tilesheet.png', {
      frameWidth: 80,
      frameHeight: 110,
    });
  }

  ready() {
    this.scene.start('Intro');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Intro');
    }
  }
}