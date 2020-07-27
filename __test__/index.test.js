import GameScene from '../src/scenes/GameScene';
import bgImage from '../src/Objects/background';
import Dialogue from '../src/scenes/Dialogue';
import scenario from '../src/Objects/dialog';

const { dialog } = scenario;
const { background } = bgImage;

it('creates a new scene', () => {
  const scene = new GameScene(
    'First',
    bgImage.background[0],
    'move',
    'Dialog1',
  );
  expect(scene).toBeTruthy();
});

it('creates a new dialog', () => {
  const newDialogue = new Dialogue(
    'Dialog1',
    new Dialogue('Dialog1', 'Stage 1 Cleared', scenario.dialog[0][0], 'Second'),
  );
  expect(newDialogue).toBeTruthy();
});

it('dialogues imported from array', () => {
  expect(Array.isArray(dialog)).toBeTruthy();
});

it('dialogues are an array of arrays', () => {
  expect(Array.isArray(dialog)).toBeTruthy();
});

it('gets the backgound image from an array', () => {
  expect(Array.isArray(background)).toBeTruthy();
});
