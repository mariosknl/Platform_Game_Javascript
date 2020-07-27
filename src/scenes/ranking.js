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

    const style = { fontSize: '32px' };

    this.add.text(config.width / 2 - 160, 50, 'POS  SCORE  NAME', style).setTint(0xff00ff);
    this.score = await api.getScore();

    this.count = 0;
    this.position = 100;
    this.sortScore = this.score.result.sort((a, b) => (a.score > b.score ? -1 : 1));

    this.sortScore.forEach((res) => {
      this.count += 1;
      if (this.count < 11) {
        const st = this.count === 1 ? 'ST' : 'ND';

        this.add.text(config.width / 2 - 120, this.position, `${this.count}${st} ${res.score} ${res.user}`, style).setTint(0xffffff);
        this.position += 25;
      }
    });

    this.menuBtn = new Button(this, config.width / 2, 500, 'grey_button1', 'grey_button2', 'Menu', 'Title');
  }
}