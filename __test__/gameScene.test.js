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
  const mock = jest.fn(() => 'addHumanAbove');
  expect(mock('foo')).toBe('addHumanAbove');
});

it('expects to collect human', () => {
  const mock = jest.fn().mockImplementation(() => 'handleCollectHuman');
  expect(mock('foo')).toBe('handleCollectHuman');
  expect(mock).toHaveBeenCalledWith('foo');
});

it('expects to find the last platform', () => {
  const mock = jest.fn();
  mock.mockReturnValue('bottomPlatform');

  expect(mock('foo')).toBe('bottomPlatform');
  expect(mock).toHaveBeenCalledWith('foo');
});

it('expects to change scene after certain number of kills', () => {
  const mock = jest.fn().mockImplementation(() => 'changeScene');
  expect(mock('foo')).toBe('changeScene');
  expect(mock).toHaveBeenCalledWith('foo');
});
