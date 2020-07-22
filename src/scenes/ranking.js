import Phaser from 'phaser';
import api from '../config/apiconf';

export default class Ranking extends Phaser.Scene {
  constructor() {
    super({ key: 'Ranking' });
  }

  async create() {
    this.add.text(100, 200, 'POS SCORE NAME').setTint(0xff00ff);
    this.score = await api.getScore();

    this.count = 0;
    this.position = 310;
    this.sortScore = this.score.result.sort((a, b) => (a.score > b.score ? -1 : 1));
    this.sortScore.foreEach((res) => {
      this.count += 1;
      const st = this.count === 1 ? 'ST' : 'ND';
      this.add.text(100, this.position, `${this.count}${st} ${res.score} %{result.user}`).setTint(0xff0000);
      this.position += 25;
    });
  }
}