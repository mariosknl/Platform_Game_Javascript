import Phaser from 'phaser';
import config from './config/config';
import GameScene from './scenes/GameScene';
import Bootscene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import IntroScene from './scenes/IntroScene';
import TitleScene from './scenes/TitleScene';
import OptionsScene from './scenes/OptionsScene';
import CreditsScene from './scenes/CreditsScene';
import GameOver from './scenes/GameOver';
import Model from './Model/model';
import background from './Objects/background';
import Dialogue from './scenes/Dialogue';
import story from './Objects/dialog';
import api from './config/apiconf';


class Game extends Phaser.Game {
  constructor() {
    super(config);
    // api.postScore('John Doe', 1);
    // api.getScore();
    // api.postScore('Maria Doe', 2);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', Bootscene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);

    this.scene.add('Intro', IntroScene);
    this.scene.add('First', new GameScene('First', background.background[0], 'human', 'Dialog1'));
    this.scene.add('Second', new GameScene('Second', background.background[1], 'woman', 'Dialog2'));
    this.scene.add('Third', new GameScene('Third', background.background[2], 'human', 'Dialog3'));

    this.scene.add('Dialog1', new Dialogue('Dialog1', story.dialog[0][0], '', 'Second'));
    this.scene.add('Dialog2', new Dialogue('Dialog2', story.dialog[0][1], '', 'Third'));
    this.scene.add('Dialog3', new Dialogue('Dialog3', story.dialog[0][2], '', 'rexUI'));

    this.scene.add('GameOver', GameOver);
    this.scene.start('Boot');
  }
}

window.game = new Game();