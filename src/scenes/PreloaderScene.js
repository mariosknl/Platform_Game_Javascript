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
    // this.load.image('background', '../src/assets/bg_layer1.png');
    // this.load.image('platform', '../src/assets/ground_grass.png');
    // this.load.image('bunny-stand', '../src/assets/bunny1_stand.png');
    // this.load.image('carrot', '../src/assets/carrot.png');
    // this.load.image('bunny-jump', '../src/assets/bunny1_jump.png');
    // this.load.audio('jump', 'src/assets/audio/footstep_grass_001.mp3');
    // this.load.audio('death', 'src/assets/audio/death.mp3');
    // this.cursors = this.input.keyboard.createCursorKeys();

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
    this.load.audio('bgMusic', '../src/assets/ui/intro.mp3');
  }

  ready() {
    this.scene.start('Options');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Options');
    }
  }
}