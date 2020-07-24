import Phaser from 'phaser';
import Button from '../Objects/Βutton';
import config from '../config/config';

export default class Winner extends Phaser.Scene {
  constructor() {
    super('winner');
  }

  create() {
    this.add.image(400, 300, 'winner');

    this.add.text(config.width * 0.5, config.height / 2 - 200, 'You are the RULER now!!!', { fontSize: 48 }).setOrigin(0.5);

    this.titleBtn = new Button(this, config.width / 2, config.height / 2 + 200, 'grey_button1', 'grey_button2', 'Menu', 'Title');

    this.scoreBtn = new Button(this, config.width / 2, config.height / 2 + 100, 'grey_button1', 'grey_button2', 'Save Score', 'rexUI');
  }
}