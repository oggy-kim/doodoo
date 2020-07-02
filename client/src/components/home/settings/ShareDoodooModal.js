import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { toggleShareModal, requestShare, showError } from '../../../actions';
import { connect, useSelector } from 'react-redux';
import SnackBar from '../../home/components/SnackBar';
import axios from 'axios';
import SelectProfile from '../../common/SelectProfile';
import FindUserForm from '../components/FindUserForm';
import RequestShareForm from '../components/RequestShareForm';
import { set } from 'lodash';
import variable from '../../../config/variable';

const ShareDoodooModal = ({ dispatch, open, group }) => {
  const auth = useSelector((state) => state.auth);
  const [shareUser, setShareUser] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append('img', pic.file);
    // dispatch(uploadProfilePic(formData));
  };

  const onSubmit = async ({ nickname }) => {
    if (nickname === auth.nickname) {
      dispatch(showError('본인의 닉네임입니다.'));
    } else {
      const res = await axios.get(`/api/users/find?nickname=${nickname}`);
      setShareUser(res.data.user);
    }
  };

  const renderFindResult = () => {
    switch (shareUser) {
      case undefined:
        return;
      case null:
        return (
          <div className='find-user-result none'>🔍 검색결과가 없습니다.</div>
        );
      default:
        return (
          <div className='find-user-result'>
            <div className='user'>
              <img
                id={`profile ${shareUser._id}`}
                key={
                  shareUser.profilepic
                    ? `profile ${shareUser._id}`
                    : `profile basic`
                }
                src={
                  shareUser.profilepic
                    ? `${variable.imageUrl}/profileimg/${
                        shareUser._id
                      }.png?t=${Date.now()}`
                    : `${variable.imageUrl}/profileimg/basic.png`
                }
              />{' '}
              <p>{shareUser.nickname} 님에게</p>
            </div>
            <div className='group'>
              <div
                className='group-color'
                style={{ backgroundColor: `${group.groupColor}` }}
              ></div>
              <div className='group-title'>
                <strong>{group.title}</strong>
              </div>
              &nbsp; 두두 함께하기 요청하기
            </div>
            <RequestShareForm onSubmit={onRequest} />
            <small>
              함께하기 요청은 7일 간 유지되며, 7일 내 상대방이 수락하지 않는
              경우 자동 취소됩니다.
            </small>
          </div>
        );
    }
  };

  const onRequest = ({ content }) => {
    let form = {};
    form._group = group._id;
    form.requestMessage = content;
    form._shareUser = shareUser._id;
    dispatch(requestShare(form));
  };

  const renderContent = (
    <div className='modal share-doodoo'>
      <h2>친구와 두두 공유하기</h2>
      <FindUserForm onSubmit={onSubmit} />
      {renderFindResult()}
    </div>
  );

  const handleClose = () => {
    setShareUser();
    dispatch(toggleShareModal());
  };

  return (
    <React.Fragment>
      <Modal
        style={{ zIndex: 10000 }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        group={group}
      >
        {renderContent}
      </Modal>
    </React.Fragment>
  );
};

export default connect(null)(ShareDoodooModal);
