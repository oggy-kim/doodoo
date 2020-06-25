import React, { Component, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { onChange, joinViaSNS } from '../../../actions';
import SNSJoinForm from './SNSJoinForm';
import unsplash from '../../../api/unsplash';
import SnackBar from '../../home/components/SnackBar';

export default () => {
  const dispatch = useDispatch();
  const { duplicate, error } = useSelector((state) => state.join);
  const { open, autoHideDuration, message } = useSelector(
    (state) => state.snackbar
  );

  const backgroundImage = async () => {
    const response = await unsplash.get('/search/photos', {
      params: { query: 'sky' },
    });
    const todayNum = new Date().getDate() % 10;
    document.getElementById('root').style.backgroundImage = `url(${
      response.data.results[`${todayNum}`].urls.regular
    })`;
  };

  //   const onChange = () => {
  //     if (duplicate !== '') {
  //       document.querySelector(`.form-field.${duplicate} > small`).textContent =
  //         '';
  //     }
  //     dispatch(onChange());
  //   };

  const onSubmit = async (formValues) => {
    dispatch(joinViaSNS(formValues));
  };
  useEffect(() => {
    backgroundImage();
  }, []);

  return (
    <div className='intro-container'>
      <img src='/images/icons/doodoo_intro.png' />
      <p>함께 간편하게 할일을 공유하는</p>
      <div className='join-form'>
        <h3>추가 정보 입력</h3>
        <SNSJoinForm onChange={onChange} onSubmit={onSubmit} />
      </div>
      <SnackBar
        open={open}
        autoHideDuration={autoHideDuration}
        message={message}
      />
    </div>
  );
};
