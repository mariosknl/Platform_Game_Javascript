/* eslint-disable no-underscore-dangle */
import Phaser from 'phaser';
import api from '../config/apiconf';
import gameOpt from '../config/gameOptions';


export default class userRecord extends Phaser.Scene {
  constructor() {
    super({
      key: 'rexUI',
    });
    this.count = 1;
  }

  preload() {
    let url;
    url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js';
    this.load.plugin('rexbbcodetextplugin', url, true);

    url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js';
    this.load.plugin('rextexteditplugin', url, true);
  }

  create() {
    this.add.image(400, 300, 'background');

    const keyObj = this.input.keyboard.addKey('Enter');
    const printText = this.add.rexBBCodeText(400, 300, 'abc', {
      color: 'yellow',
      fontSize: '24px',
      fixedWidth: 200,
      backgroundColor: '#333333',
    })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        // console.log(this.plugins.get('rextexteditplugin').edit(printText));
        this.count = 0;
        this.plugins.get('rextexteditplugin').edit(printText);
        keyObj.on('down', () => {
          if (this.count === 0) {
            this.count = 1;
            // eslint-disable-next-line no-underscore-dangle
            api.postScore(printText._text, gameOpt.gameOptions.score);
            this.scene.start('Title');
          }
        });
      }, this);

    this.add.text(0, 580, 'Click text to start editing, press enter key to stop editing');
  }
}