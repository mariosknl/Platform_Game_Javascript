import Dialog from '../src/scenes/Dialogue';
import scenario from '../src/Objects/dialog';

const newScene = new Dialog('Intro', 'Introduction', scenario[0], 'First');

it('has many values', () => {
  expect(newScene.selfScene).toBe('Intro');
  expect(newScene.title).toBe('Introduction');
  expect(newScene.content).toBe(scenario[0]);
  expect(newScene.nextScene).toBe('First');
});
