const axios = require('axios');

const apiconf = async () => {
  const res = await axios.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
    name: 'Zombie Hunger',
  });
  return res;
};

const getScore = async () => {
  const res = await axios.get('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/9y9ibRKX6pvPi2E6g3aM/scores/');
  return res.data;
};

const postScore = async (user, score) => {
  const body = JSON.stringify({ user, score });
  const options = {
    'Content-Type': 'application/json',
  };
  const res = await axios.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/9y9ibRKX6pvPi2E6g3aM/scores/', body, {
    headers: options,
  });

  return res.data;
};

export default { apiconf, getScore, postScore };