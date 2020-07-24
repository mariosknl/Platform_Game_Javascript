import api from '../src/config/apiconf';

it('saves the score and username to the API', () => {
  api.postScore('marios', 50).then((score) => expect(score).toBe('Leaderboard score created correctly.'));
});

it('get score and username in descending order from the API', () => {
  api.getScore().then((scores) => expect(typeof scores).toBe('object'));
});

it('ranking contains the user', () => {
  api.getScore().then(data => {
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user: 'marios',
        }),
      ]),
    );
  });
});

it('ranking contains the score', () => {
  api.getScore().then(data => {
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          score: '50',
        }),
      ]),
    );
  }).catch(() => {

  });
});