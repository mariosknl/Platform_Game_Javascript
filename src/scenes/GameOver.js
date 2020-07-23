import Phaser from 'phaser';
import Button from '../Objects/Βutton';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over');
  }

  init(data) {
    this.prevScene = data.prevScene;
  }

  create() {
    this.add.image(400, 300, 'gameOver');

    const { width } = this.scale;
    const { height } = this.scale;

    this.add.text(width * 0.5, height * 0.5, 'Game Over', {
      fontSize: 48,
    }).setOrigin(0.5);

    this.add.text(10, 10, 'Press Space to move to Main Menu', { fontSize: '12px', fill: '#fff' });

    this.input.keyboard.once('keydown_SPACE', () => {
      this.scene.start('Title');
    });
  }
}