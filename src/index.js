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

class Game extends Phaser.Game {
  constructor() {
    super(config);

    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', Bootscene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Intro', IntroScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('GameOver', GameOver);
    this.scene.start('Boot');
  }
}

window.game = new Game();