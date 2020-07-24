import GameScene from '../src/scenes/GameScene';
import background from '../src/Objects/background';


const gameScene = new GameScene('First', background.background[0], 'move', 'Dialog1');

it('every scene has multiple attributes', () => {
  expect(gameScene.selfScene).toBe('First');
  expect(gameScene.background).toBe('background');
  expect(gameScene.enemy).toBe('move');
  expect(gameScene.nextScene).toBe('Dialog1');
});

it('expects to put enemies in top of the platform', () => {
  expect(gameScene.addHumanAbove).toBe('human');
});