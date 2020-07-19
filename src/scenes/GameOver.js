import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over');
  }

  create() {
    const { width } = this.scale;
    const { height } = this.scale;

    this.add.text(width * 0.5, height * 0.5, 'Game Over', {
      fontSize: 48,
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown_SPACE', () => {
      this.scene.start('game');
    });
  }
}