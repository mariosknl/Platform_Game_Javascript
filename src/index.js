import Phaser from 'phaser';

import Game from './scenes/Game';

import GameOver from './scenes/GameOver';

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  scene: [Game, GameOver],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 200,
      },
    },
  },
});