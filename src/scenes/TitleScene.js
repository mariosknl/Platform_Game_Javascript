import Phaser from 'phaser';
import config from '../config/config';
import Button from '../Objects/Βutton';


export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 100,
      'grey_button1', 'grey_button2', 'Play', 'Game');

    this.optionsButton = new Button(this, config.width / 2, config.height / 2, 'grey_button1', 'grey_button2', 'Options', 'Options');

    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 100,
      'grey_button1', 'grey_button2', 'Credits', 'Credits');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.8, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}