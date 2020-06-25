var moment = require('moment');

const getBaseTime = () => {
  const momentDate = moment(Date.now()).tz('Asia/Seoul').format('HHmm');
  let result = {
    base_date: moment(Date.now()).tz('Asia/Seoul').format('YYYYMMDD'),
    fcst_date: moment(Date.now())
      .add(1, 'days')
      .tz('Asia/Seoul')
      .format('YYYYMMDD'),
    now_base_date: moment(Date.now()).tz('Asia/Seoul').format('YYYYMMDD'),
  };
  if (momentDate < 300) {
    result['base_date'] = moment(Date.now())
      .tz('Asia/Seoul')
      .format('YYYYMMDD')
      .add(-1, 'days');
    result[fcst_date] = moment(Date.now()).tz('Asia/Seoul').format('YYYYMMDD');
    result['base_time'] = '2300';
  } else if (momentDate < 600) {
    result['base_time'] = '0200';
  } else if (momentDate < 900) {
    result['base_time'] = '0500';
  } else if (momentDate < 1200) {
    result['base_time'] = '0800';
  } else if (momentDate < 1500) {
    result['base_time'] = '1100';
  } else if (momentDate < 1800) {
    result['base_time'] = '1400';
  } else if (momentDate < 2100) {
    result['base_time'] = '1700';
  } else {
    result['base_time'] = '2000';
  }

  if (momentDate % 100 > 40) {
    if (momentDate > 1000) {
      result['now_base_time'] = `${parseInt(momentDate / 100)}00`;
    } else {
      result['now_base_time'] = `0${parseInt(momentDate / 100)}00`;
    }
  } else {
    if (momentDate > 1100) {
      result['now_base_time'] = `${parseInt(momentDate / 100) - 1}00`;
    } else if (momentDate > 40) {
      result['now_base_time'] = `0${parseInt(momentDate / 100) - 1}00`;
    } else {
      result['now_base_date'] = moment(Date.now())
        .tz('Asia/Seoul')
        .format('YYYYMMDD')
        .add(-1, 'days');
      result['now_base_time'] = '2300';
    }
  }

  return result;
};

module.exports = getBaseTime;
