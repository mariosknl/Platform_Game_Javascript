import Phaser from 'phaser';
import api from '../config/apiconf';
import Button from '../Objects/Βutton';
import config from '../config/config';

export default class Ranking extends Phaser.Scene {
  constructor() {
    super({ key: 'ranking' });
  }

  async create() {
    this.add.image(400, 300, 'background');

    this.add.text(config.width / 2 - 80, 50, 'POS SCORE NAME').setTint(0xff00ff);
    this.score = await api.getScore();

    this.count = 0;
    this.position = 70;
    this.sortScore = this.score.result.sort((a, b) => (a.score > b.score ? -1 : 1));
    this.sortScore.forEach((res) => {
      this.count += 1;
      if (this.count < 10) {
        const st = this.count === 1 ? 'ST' : 'ND';
        const style = { fontSize: '32px' };
        this.add.text(config.width / 2 - 120, this.position, `${this.count}${st} ${res.score} ${res.user}`, style).setTint(0xf4a261);
        this.position += 25;
      }
    });

    this.menuBtn = new Button(this, config.width / 2, 500, 'grey_button1', 'grey_button2', 'Menu', 'Title');
  }
}