const axios = require('axios');
const keys = require('../config/keys');

const url = 'https://dapi.kakao.com/v2/local/geo/coord2address.json';

const coordToAddress = async (latitude, longitude) => {
  const result = await axios.get(url, {
    headers: {
      Authorization: `KakaoAK ${keys.kakaoREST}`,
    },
    params: {
      y: latitude,
      x: longitude,
      input_coord: 'WGS84',
    },
  });
  return result.data.documents;
};

module.exports = coordToAddress;
