import Phaser from 'phaser';
import config from '../config/config';
import Button from '../Objects/Βutton';


export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.add.image(400, 300, 'bgTitle');
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100,
      'grey_button1', 'grey_button2', 'Play', 'First');

    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'grey_button1', 'grey_button2', 'Options', 'Options');

    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 100,
      'grey_button1', 'grey_button2', 'Credits', 'Credits');

    this.rankingBtn = new Button(this, config.width / 2, config.height / 2 + 200, 'grey_button1', 'grey_button2', 'Ranking', 'ranking');
  }
}