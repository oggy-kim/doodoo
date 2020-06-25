var axios = require('axios');
var keys = require('../config/keys');

module.exports = axios.create({
  baseURL: 'http://apis.data.go.kr/1360000/VilageFcstInfoService',
  params: {
    serviceKey: `${keys.airkoreaKey}`,
    pageNo: 1,
    dataType: 'json',
  },
});
