import React, { useEffect, useState } from 'react';
import { fetchWeatherInfo, updateGPS } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import Loading from '../../common/Loading';

export default () => {
  const weather = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          dispatch(
            updateGPS({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            })
          );
        },
        (err) => {
          dispatch(
            updateGPS({
              latitude: false,
              longitude: false,
            })
          );
        }
      );
    }
  };

  useEffect(() => {
    getLocation();
    dispatch(fetchWeatherInfo(weather.latitude, weather.longitude));
  }, [weather.latitude, weather.longitude]);

  const renderWeather = () => {
    if (weather.latitude === null || !weather.nowWeatherInfo) {
      return <Loading />;
    }
    if (!weather.latitude) {
      return <div>위치정보가 없습니다. 위치정보 제공을 허용해주세요!</div>;
    } else {
      return [
        <React.Fragment key='weather-info'>
          <div className='weather-info top'>
            <span className='address'>
              <LocationOnIcon />
              {weather.address}
            </span>
            <span className='nowtemp'>
              현재 {weather.nowWeatherInfo.temp}°C,
              {renderWeatherCondition(weather.nowWeatherInfo.condition)}{' '}
              <small>
                ({weather.nowWeatherInfo.baseTime.substr(0, 2)}시 기준)
              </small>
            </span>
          </div>
          <div className='weather-info bottom'>
            <div className='today'>
              <p>
                {weather.todayWeatherInfo.baseDate.substr(4, 2)}/
                {weather.todayWeatherInfo.baseDate.substr(6, 2)}
              </p>
              <div>
                <div className='morning'>
                  <p>오전</p>
                  {renderWeatherIcon(
                    weather.todayWeatherInfo.sky.morning,
                    weather.todayWeatherInfo.condition.morning
                  )}
                </div>
                <div className='evening'>
                  <p>오후</p>
                  {renderWeatherIcon(
                    weather.todayWeatherInfo.sky.evening,
                    weather.todayWeatherInfo.condition.evening
                  )}
                </div>
              </div>
              <p>
                {weather.todayWeatherInfo.lowTemp}°C~
                {weather.todayWeatherInfo.maxTemp}°C
              </p>
            </div>
            <div className='tomorrow'>
              <p>
                {weather.tomorrowWeatherInfo.baseDate.substr(4, 2)}/
                {weather.tomorrowWeatherInfo.baseDate.substr(6, 2)}
              </p>
              <div>
                <div className='morning'>
                  <p>오전</p>
                  {renderWeatherIcon(
                    weather.tomorrowWeatherInfo.sky.morning,
                    weather.tomorrowWeatherInfo.condition.morning
                  )}
                </div>
                <div className='evening'>
                  <p>오후</p>
                  {renderWeatherIcon(
                    weather.tomorrowWeatherInfo.sky.evening,
                    weather.tomorrowWeatherInfo.condition.evening
                  )}
                </div>
              </div>
              <p>
                {weather.tomorrowWeatherInfo.lowTemp}°C~
                {weather.tomorrowWeatherInfo.maxTemp}°C
              </p>
            </div>
          </div>
        </React.Fragment>,
      ];
    }
  };

  const renderWeatherCondition = (condition) => {
    switch (condition) {
      case '0':
        return '맑음';
      case '1':
        return '비';
      case '2':
        return '눈/비';
      case '3':
        return '눈';
      case '4':
        return '소나기';
    }
  };
  const renderWeatherIcon = (sky, condition) => {
    if (sky === '1') {
      return <img src='/images/icons/weather/sun.png' />;
    } else if (sky === '3') {
      return <img src='/images/icons/weather/sunny.png' />;
    } else {
      if (condition === '0') {
        return <img src='/images/icons/weather/cloudy.png' />;
      } else if (condition === '1' || condition === '2') {
        return <img src='/images/icons/weather/rain.png' />;
      } else if (condition === '3') {
        return <img src='/images/icons/weather/snow.png' />;
      } else {
        return <img src='/images/icons/weather/lightning.png' />;
      }
    }
  };

  return (
    <div className='today-weather'>
      <h3>오늘의 날씨</h3>
      {renderWeather()}
    </div>
  );
};
