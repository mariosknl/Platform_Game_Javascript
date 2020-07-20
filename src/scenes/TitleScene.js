import Phaser from 'phaser';
import config from '../config/config';


export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // game Buttons
    this.gameBtn = this.add.sprite(100, 200, 'grey_button1').setInteractive();
    this.centerBtn(this.gameBtn, 1);

    this.gameTxt = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#000' });
    this.centerBtnTxt(this.gameTxt, this.gameBtn);

    this.gameBtn.on('pointerdown', (pointer) => {
      this.scene.start('Game');
    });

    // options button
    this.optionsBtn = this.add.sprite(300, 200, 'grey_button1').setInteractive();
    this.centerBtn(this.optionsBtn);

    this.optionsTxt = this.add.text(0, 0, 'Options', { fontSize: 32, fill: '#000' });
    this.centerBtnTxt(this.optionsTxt, this.optionsBtn);

    this.optionsBtn.on('pointerdown', (pointer) => {
      this.scene.start('Options');
    });

    // credits button
    this.creditsBtn = this.add.sprite(300, 200, 'grey_button1').setInteractive();
    this.centerBtn(this.creditsBtn, -1);

    this.creditsTxt = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#000' });
    this.centerBtnTxt(this.creditsTxt, this.creditsBtn);

    this.creditsBtn.on('pointerdown', (pointer) => {
      this.scene.start('Credits');
    });


    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('grey_button2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('grey_button1');
    });

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.8, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

  centerBtn(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2, config.height / 2 - offset * 100, config.width, config.height),
    );
  }

  centerBtnTxt(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }
}