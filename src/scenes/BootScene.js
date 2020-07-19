import Phaser from 'phaser';

export default class Bootscene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', '../src/assets/logo.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}