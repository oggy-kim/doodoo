import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../common/Loading';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import {
  deleteGroup,
  showSnackbar,
  editGroup,
  fetchGroup,
  toggleShareModal,
  deleteMessage,
} from '../../../actions';

import ShareDoodooModal from './ShareDoodooModal';
import variable from '../../../config/variable';

export default () => {
  const myList = useSelector((state) => state.group);
  const auth = useSelector((state) => state.auth);
  const { share, group } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const renderMyList = () => {
    if (myList === null) {
      return <Loading />;
    } else {
      let result = [];
      for (let _id in myList) {
        if (!myList[_id]._shareUser) {
          result.push(
            <div className={`group ${myList[_id]._id}`} key={myList[_id]._id}>
              <div
                className='group-color'
                style={{ backgroundColor: `${myList[_id].groupColor}` }}
              ></div>
              <div className='group-title'>{myList[_id].title}</div>
              <small>
                {moment(myList[_id].createDate).locale('ko').fromNow()} 생성
              </small>
              {myList[_id]._message ? (
                <React.Fragment>
                  <small>( 함께하기 요청중 )</small>
                  <Button
                    className='cancel-request'
                    type='button'
                    variant='contained'
                    color='secondary'
                    size='small'
                    onmouseover={onMouseOver}
                    onClick={handleCancel}
                    value={myList[_id]._message._id}
                  >
                    요청취소
                  </Button>
                </React.Fragment>
              ) : (
                <Button
                  type='button'
                  variant='contained'
                  color='primary'
                  size='small'
                  value={myList[_id]._id}
                  onClick={handleConnect}
                >
                  함께하기
                </Button>
              )}

              <ShareDoodooModal open={share} group={group} />
              <Button
                type='button'
                variant='contained'
                color='secondary'
                size='small'
                value={myList[_id]._id}
                onClick={handleDelete}
              >
                삭제
              </Button>
            </div>
          );
        }
      }
      if (result.length === 0) {
        return (
          <div className='none'>
            <img src='/images/icons/doodoo.png' style={{ height: '50px' }} />
            <br />
            나만의 두두가 없습니다. 지금 두두를 추가해보세요!
          </div>
        );
      }
      return result;
    }
  };

  const renderSharedUser = (_id, groupId) => {
    let sharedUser = '';
    if (_id === groupId._user._id) {
      return (
        <React.Fragment>
          <img
            title={groupId._shareUser.nickname}
            src={
              groupId._shareUser.profilepic === true
                ? `${variable.imageUrl}/profileimg/${groupId._shareUser._id}.png`
                : `${variable.imageUrl}/profileimg/basic.png`
            }
          />
          <small>{groupId._shareUser.nickname} 님과 &nbsp;</small>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <img
            title={groupId._user.nickname}
            src={
              groupId._user.profilepic === true
                ? `${variable.imageUrl}/profileimg/${groupId._user._id}.png`
                : `${variable.imageUrl}/profileimg/basic.png`
            }
          />
          <small>{groupId._user.nickname} 님과 &nbsp; </small>
        </React.Fragment>
      );
    }
  };

  const renderSharedList = () => {
    if (myList === null) {
      return <Loading />;
    } else {
      let result = [];
      for (let _id in myList) {
        if (myList[_id]._shareUser) {
          result.push(
            <div className={`group ${myList[_id]._id}`} key={myList[_id]._id}>
              <div
                className='group-color'
                style={{ backgroundColor: `${myList[_id].groupColor}` }}
              ></div>
              <div className='group-title'>{myList[_id].title}</div>
              {renderSharedUser(auth._id, myList[_id])}
              <small>
                {moment(myList[_id].sharedDate).locale('ko').fromNow()} 공유
                시작
              </small>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                size='small'
                value={myList[_id]._id}
                onClick={handleDisconnect}
              >
                연결끊기
              </Button>
            </div>
          );
        }
      }
      if (result.length === 0) {
        return (
          <div className='none'>
            <img src='/images/icons/doodoo.png' style={{ height: '50px' }} />
            <br />
            함께하는 두두가 없습니다. 친구들과 두두를 공유해보세요!{' '}
          </div>
        );
      }
      return result;
    }
  };

  const handleDisconnect = async (e) => {
    if (
      window.confirm(
        '다른 사용자가 생성한 두두와 연결을 끊으시면 해당 두두의 아이템을 다시 접근할 수 없습니다. 그래도 연결을 끊으시겠습니까?'
      )
    ) {
      await dispatch(editGroup(e.target.value, 'disconnect'));
      await dispatch(fetchGroup());
    }
  };

  const handleCancel = async (e) => {
    if (window.confirm('함께하기 요청을 취소하시겠습니까?')) {
      await dispatch(deleteMessage(e.target.value));
      await dispatch(fetchGroup());
    }
  };

  const onMouseOver = async (e) => {
    console.log('mouse over!');
  };

  const handleConnect = (e) => {
    dispatch(toggleShareModal(myList[e.target.value]));
    console.log(myList[e.target.value]);
  };

  const handleDelete = (e) => {
    if (
      window.confirm(
        '이 두두를 삭제하시게 되면 두두 내의 모든 아이템은 복구가 불가합니다. 그래도 삭제하시겠습니까?'
      )
    ) {
      console.log(myList[e.target.value]._user._id);
      console.log(auth._id);
      if (myList[e.target.value]._user._id !== auth._id) {
        dispatch(
          showSnackbar(
            '❗ 두두는 사용자 본인이 만든 경우에만 삭제가 가능합니다.'
          )
        );
      } else {
        dispatch(deleteGroup(e.target.value));
      }
    }
  };

  return (
    <content className='setting'>
      <h2>📑 두두 관리</h2>
      <h3 className='moveleft'>🧍‍♂️ 나만의 두두 설정</h3>
      {renderMyList()}
      <h3 className='moveleft'>👭 함께하는 두두 설정</h3>
      {renderSharedList()}
    </content>
  );
};
