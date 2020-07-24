import Phaser from 'phaser';
import Button from '../Objects/Βutton';
import config from '../config/config';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('game-over');
  }

  create() {
    this.add.image(400, 300, 'gameOver');

    this.titleBtn = new Button(this, config.width / 2, config.height / 2 + 200, 'grey_button1', 'grey_button2', 'Menu', 'Title');

    this.scoreBtn = new Button(this, config.width / 2, config.height / 2 + 100, 'grey_button1', 'grey_button2', 'Save Score', 'rexUI');

    this.add.text(config.width * 0.5, config.height / 2 - 200, 'Game Over', {
      fontSize: 48,
    }).setOrigin(0.5);

    this.add.text(10, 10, 'Press Space to move to Main Menu', { fontSize: '12px', fill: '#fff' });

    this.input.keyboard.once('keydown_SPACE', () => {
      this.scene.start('Title');
    });
  }
}