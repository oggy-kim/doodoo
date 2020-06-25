import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../css/Settings.css';
import ChangeProfileForm from './ChangeProfileForm';
import ChangeProfilepicModal from './ChangeProfilepicModal';
import { editProfile, withdrawUser } from '../../../actions';
import { Button } from '@material-ui/core';

export default () => {
  const dispatch = useDispatch();
  const { _id, password, sns, email, nickname, profilepic } = useSelector(
    (state) => state.auth
  );

  const onSubmit = async (formValues) => {
    let values = {};
    if (formValues.nickname !== nickname) {
      values.nickname = formValues.nickname;
    }
    if (formValues.email !== email) {
      values.email = formValues.email;
    }
    dispatch(editProfile(values));
  };

  const handleWithdraw = () => {
    if (
      window.confirm(
        '탈퇴하시게 되면 기존의 사용하던 두두, 아이템은 모두 파기되며 복구하실 수 없습니다. 그럼에도 탈퇴하시겠습니까?'
      )
    ) {
      if (window.confirm('절대 복구되지 않습니다. 그래도 괜찮으신가요?')) {
        dispatch(withdrawUser());
      }
    }
  };

  const renderForm = () => {
    return [
      <React.Fragment>
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
          <div className='user-nickname'>
            <p>{nickname}</p>
            <ChangeProfilepicModal />
          </div>
        </div>
        <h3>🔒 개인정보 변경</h3>
        <ChangeProfileForm onSubmit={onSubmit} />
        <h3 style={{ marginTop: '100px' }}>😱😭 회원 탈퇴</h3>
        <Button
          type='button'
          variant='contained'
          onClick={handleWithdraw}
          color='secondary'
        >
          탈퇴
        </Button>
      </React.Fragment>,
    ];
  };

  return (
    <content className='setting'>
      <h2>🏤 프로필 변경</h2>
      {renderForm()}
    </content>
  );
};
