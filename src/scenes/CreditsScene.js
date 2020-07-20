/* eslint-disable no-unused-expressions */
import Phaser from 'phaser';
import config from '../config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.creditsTxt = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.createdByTxt = this.add.text(0, 0, 'Created By: Marios Kanellopoulos', { fontSize: '32px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.creditsTxt,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.createdByTxt,
      this.zone,
    );

    this.createdByTxt.setY(1000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsTxt,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: () => {
        this.destroy;
      },
    });

    this.createdByTween = this.tweens.add({
      targets: this.createdByTxt,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: () => {
        this.creditsTween.destroy;
        this.scene.start('Title');
      },
    });
  }
}