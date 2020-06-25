import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../css/Settings.css';
import ChangePasswordForm from './ChangePasswordForm';

import { changePassword, editProfile } from '../../../actions';

export default () => {
  const dispatch = useDispatch();
  const { _id, password, sns, nickname, profilepic } = useSelector(
    (state) => state.auth
  );

  const onSubmit = async (formValues) => {
    await dispatch(editProfile(formValues));
  };

  const renderForm = () => {
    switch (sns) {
      case null:
        return [
          <React.Fragment>
            <h2>🔑 비밀번호 변경</h2>
            <div className='user-information'>
              <img
                key={profilepic ? `profile ${_id}` : `profile basic`}
                id={`profile ${_id}`}
                alt='profile pic'
                src={
                  profilepic
                    ? `/images/profileimg/${_id}.png?t=${Date.now()}`
                    : `/images/profileimg/basic.png`
                }
              />
              <div>{nickname}</div>
            </div>
            <ChangePasswordForm onSubmit={onSubmit} password={password} />
          </React.Fragment>,
        ];
      default:
        return (
          <React.Fragment>
            <h3>
              SNS 로그인 사용자는 별도 비밀번호 변경없이 안전하게 관리됩니다.(
              {sns} 계정으로 로그인)
            </h3>
          </React.Fragment>
        );
    }
  };

  return <content className='setting'>{renderForm()}</content>;
};
