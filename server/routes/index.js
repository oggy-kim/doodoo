var express = require('express');
var router = express.Router();
var keys = require('../config/keys');
var weather = require('../apis/weather');
var moment = require('moment');
var gpsToXy = require('../apis/gpsToXy');
var getBaseDate = require('../apis/getBaseDate');
var coordToAddress = require('../apis/coordToAddress');

require('moment-timezone');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('hi?');
  // res.render('index', { title: 'Express' });
});

router.get('/weatherinfo', async (req, res) => {
  console.log('weather forecast came! ');
  const address = await coordToAddress(req.query.latitude, req.query.longitude);
  const nx = gpsToXy('toXY', req.query.latitude, req.query.longitude).x;
  const ny = gpsToXy('toXY', req.query.latitude, req.query.longitude).y;

  console.log(address);

  const ultraSrtNcstResult = await weather.get('/getUltraSrtNcst', {
    params: {
      base_date: getBaseDate().now_base_date,
      base_time: getBaseDate().now_base_time,
      nx,
      ny,
    },
  });

  const ultraSrtFcstResult = await weather.get('/getUltraSrtFcst', {
    params: {
      base_date: getBaseDate().now_base_date,
      base_time: getBaseDate().now_base_time,
      nx,
      ny,
    },
  });

  const vilageFcstResult = await weather.get('/getVilageFcst', {
    params: {
      base_date: getBaseDate().base_date,
      base_time: getBaseDate().base_time,
      numOfRows: 200,
      nx,
      ny,
    },
  });

  const todayFcstResult = await weather.get('/getVilageFcst', {
    params: {
      base_date: getBaseDate().base_date,
      base_time: '0200',
      numOfRows: 100,
      nx,
      ny,
    },
  });

  const todayMaxTemp = await todayFcstResult.data.response.body.items.item.find(
    (item) => {
      return (
        item.fcstDate === getBaseDate().base_date && item.category === 'TMX'
      );
    }
  );

  const todayLowTemp = await todayFcstResult.data.response.body.items.item.find(
    (item) => {
      return (
        item.fcstDate === getBaseDate().base_date && item.category === 'TMN'
      );
    }
  );

  const tomorrowMaxTemp = await vilageFcstResult.data.response.body.items.item.find(
    (item) => {
      return (
        item.fcstDate === getBaseDate().fcst_date && item.category === 'TMX'
      );
    }
  );
  const tomorrowLowTemp = vilageFcstResult.data.response.body.items.item.find(
    (item) => {
      return (
        item.fcstDate === getBaseDate().fcst_date && item.category === 'TMN'
      );
    }
  );

  res.send({
    address: `${address[0].address.region_1depth_name} ${address[0].address.region_2depth_name}`,
    nowWeatherInfo: {
      baseDate: getBaseDate().now_base_date,
      baseTime: getBaseDate().now_base_time,
      condition: ultraSrtNcstResult.data.response.body.items.item.find(
        (item) => {
          return item.category === 'PTY';
        }
      ).obsrValue,
      temp: ultraSrtNcstResult.data.response.body.items.item.find((item) => {
        return item.category === 'T1H';
      }).obsrValue,
    },
    todayWeatherInfo: {
      baseDate: getBaseDate().base_date,
      condition: {
        morning: todayFcstResult.data.response.body.items.item.find((item) => {
          return (
            item.fcstDate === getBaseDate().base_date &&
            item.fcstTime === '0900' &&
            item.category === 'PTY'
          );
        }).fcstValue,
        evening: todayFcstResult.data.response.body.items.item.find((item) => {
          return (
            item.fcstDate === getBaseDate().base_date &&
            item.fcstTime === '1500' &&
            item.category === 'PTY'
          );
        }).fcstValue,
      },
      sky: {
        morning: todayFcstResult.data.response.body.items.item.find((item) => {
          return (
            item.fcstDate === getBaseDate().base_date &&
            item.fcstTime === '0900' &&
            item.category === 'SKY'
          );
        }).fcstValue,
        evening: todayFcstResult.data.response.body.items.item.find((item) => {
          return (
            item.fcstDate === getBaseDate().base_date &&
            item.fcstTime === '1500' &&
            item.category === 'SKY'
          );
        }).fcstValue,
      },
      maxTemp: parseInt(todayMaxTemp.fcstValue),
      lowTemp: parseInt(todayLowTemp.fcstValue),
    },
    tomorrowWeatherInfo: {
      baseDate: getBaseDate().fcst_date,
      condition: {
        morning: vilageFcstResult.data.response.body.items.item.find((item) => {
          return (
            item.fcstDate === getBaseDate().fcst_date &&
            item.fcstTime === '0900' &&
            item.category === 'PTY'
          );
        }).fcstValue,
        evening: vilageFcstResult.data.response.body.items.item.find((item) => {
          return (
            item.fcstDate === getBaseDate().fcst_date &&
            item.fcstTime === '1500' &&
            item.category === 'PTY'
          );
        }).fcstValue,
      },
      sky: {
        morning: vilageFcstResult.data.response.body.items.item.find((item) => {
          return (
            item.fcstDate === getBaseDate().fcst_date &&
            item.fcstTime === '0900' &&
            item.category === 'SKY'
          );
        }).fcstValue,
        evening: vilageFcstResult.data.response.body.items.item.find((item) => {
          return (
            item.fcstDate === getBaseDate().fcst_date &&
            item.fcstTime === '1500' &&
            item.category === 'SKY'
          );
        }).fcstValue,
      },
      maxTemp: parseInt(tomorrowMaxTemp.fcstValue),
      lowTemp: parseInt(tomorrowLowTemp.fcstValue),
    },
  });
});

module.exports = router;
