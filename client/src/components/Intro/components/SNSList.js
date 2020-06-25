import React from 'react';
import _ from 'lodash';

const SNSLIST = [{ name: 'kakao' }];

const SNSList = () => {
  return _.map(SNSLIST, ({ name }) => {
    return (
      <a href={`/api/auth/${name}`} key={name}>
        <img
          className='login-sns-icon'
          alt={name}
          src={`/images/icons/${name}.png`}
        />
      </a>
    );
  });
};

export default SNSList;
