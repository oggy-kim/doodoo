import React, { useEffect } from 'react';
import CreateItemForm from '../components/CreateItemForm';
import TodoItem from '../components/TodoItem';
import { fetchItems, createItem, fetchGroup } from '../../../actions';
import { useParams } from 'react-router-dom';
import { reset } from 'redux-form';

import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../../components/common/Loading';
import SnackBar from '../components/SnackBar';
import variable from '../../../config/variable';

export default () => {
  const { id } = useParams();
  const group = useSelector((state) => state.group);
  let myGroupId = null;
  if (group) {
    myGroupId = group[id];
  }

  const todoItems = useSelector((state) => state.item);
  const { open, message } = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems(id));
  }, [id]);

  const onSubmit = async ({ content }) => {
    await dispatch(createItem(content, myGroupId._id));
    dispatch(reset('itemCreate'));
  };

  const renderMembers = () => {
    if (myGroupId === undefined || myGroupId._shareUser === null) {
      return;
    } else {
      return (
        <div className='group-members'>
          with
          <img
            title={myGroupId._user.nickname}
            id={`profile ${myGroupId._user._id}`}
            key={
              myGroupId._user.profilepic
                ? `profile ${myGroupId._user._id}`
                : `profile basic`
            }
            src={
              myGroupId._user.profilepic
                ? `${variable.imageUrl}/profileimg/${
                    myGroupId._user._id
                  }.png?t=${Date.now()}`
                : `${variable.imageUrl}/profileimg/basic.png`
            }
          />
          <img
            title={myGroupId._shareUser.nickname}
            id={`profile ${myGroupId._shareUser._id}`}
            key={
              myGroupId._shareUser.profilepic
                ? `profile ${myGroupId._shareUser._id}`
                : `profile basic`
            }
            src={
              myGroupId._shareUser.profilepic
                ? `${variable.imageUrl}/profileimg/${
                    myGroupId._shareUser._id
                  }.png?t=${Date.now()}`
                : `${variable.imageUrl}/profileimg/basic.png`
            }
          />
        </div>
      );
    }
  };

  const renderItems = () => {
    if (todoItems === null) {
      return <Loading />;
    } else if (Object.keys(todoItems).length === 0) {
      return (
        <div className='todo-item none'>
          💬 아이템이 없습니다. 아이템을 추가해주세요!
        </div>
      );
    } else {
      let result = [];
      for (let _id in todoItems) {
        result.push(
          <TodoItem
            key={`${todoItems[_id]._id}`}
            itemId={`${todoItems[_id]._id}`}
            complete={`${todoItems[_id].complete}`}
            favorite={`${todoItems[_id].favorite}`}
            content={`${todoItems[_id].content}`}
            status={`${todoItems[_id].status}`}
            createDate={`${todoItems[_id].createDate}`}
            modifyDate={`${todoItems[_id].modifyDate}`}
            profilepic={`${todoItems[_id]._user.profilepic}`}
            userId={`${todoItems[_id]._user._id}`}
            userNick={`${todoItems[_id]._user.nickname}`}
            groupId={`${todoItems[_id]._group._id}`}
          />
        );
      }
      return result;
    }
  };

  const renderGroupDetail = () => {
    switch (myGroupId) {
      case null:
        return <Loading />;
      case undefined:
        return [
          <React.Fragment key='group-recyclebin'>
            <div
              className='group-info'
              style={{ backgroundColor: `var(--primary-color)` }}
            >
              <h2>🗑 휴지통</h2>
              <p>삭제한 아이템의 공간입니다. 1주일 후 자동 삭제됩니다.</p>
            </div>
          </React.Fragment>,
        ];
      default:
        return [
          <React.Fragment key={`${myGroupId._id}`}>
            <div
              className='group-info'
              style={{ backgroundColor: `${myGroupId.groupColor}` }}
            >
              <h2>{myGroupId.title}</h2>
              <p>{myGroupId.description}</p>
              {renderMembers()}
            </div>
            <CreateItemForm onSubmit={onSubmit} />
          </React.Fragment>,
        ];
    }
  };

  return (
    <section className='group-detail'>
      {renderGroupDetail()}
      {renderItems()}
      <SnackBar open={open} message={message} />
    </section>
  );
};
