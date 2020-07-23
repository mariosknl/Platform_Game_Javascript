import Phaser from 'phaser';
import Button from '../Objects/Βutton';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(300, 100, 'Options', { fontSize: '40px' });

    this.musicBtn = this.add.image(200, 200, 'check2');
    this.musicTxt = this.add.text(250, 190, 'Music Enabled', { fontSize: '24px' });

    this.soundBtn = this.add.image(200, 300, 'check2');
    this.soundTxt = this.add.text(250, 290, 'Sound Enabled', { fontSize: '24px' });

    this.musicBtn.setInteractive();
    this.soundBtn.setInteractive();

    this.musicBtn.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    this.soundBtn.on('pointerdown', () => {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    });

    this.updateAudio();
    this.menuBtn = new Button(this, 400, 500, 'grey_button1', 'grey_button2', 'Menu', 'Title');
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicBtn.setTexture('check');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicBtn.setTexture('check2');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }
    if (this.model.soundOn === false) {
      this.soundBtn.setTexture('check');
    } else {
      this.soundBtn.setTexture('check2');
    }
  }
}