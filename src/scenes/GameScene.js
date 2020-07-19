import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.carrotsCollected = 0;
  }

  // init() {
  //   this.carrotsCollected = 0;
  // }

  preload() {
    // load images
    this.load.image('logo', '../src/assets/logo.png');
    this.load.image('background', '../src/assets/bg_layer1.png');
    this.load.image('platform', '../src/assets/ground_grass.png');
    this.load.image('bunny-stand', '../src/assets/bunny1_stand.png');
    this.load.image('carrot', '../src/assets/carrot.png');
    this.load.image('bunny-jump', '../src/assets/bunny1_jump.png');
    this.load.audio('jump', '../src/assets/audio/footstep_grass_001.mp3');
    this.load.audio('death', '../src/assets/audio/death.mp3');

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.add.image(400, 300, 'logo');
  }
}