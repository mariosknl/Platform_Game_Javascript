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
    const keyObj = this.input.keyboard.addKey('Enter');
    const printText = this.add.rexBBCodeText(400, 300, 'abc', {
      color: 'red',
      fontSize: '26px',
      fixedWidth: 200,
      backgroundColor: '#222222',
    })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.count = 0;
        this.plugins.get('rextexteditplugin').edit(printText);
        keyObj.on('down', () => { if (this.count === 0) this.count = 1; });
      }, this);
    this.add.text(0, 500, 'Click here to put your name. Press Enter to Save');
  }
}