import '../../css/Item.css';

import React from 'react';
import { useDispatch } from 'react-redux';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link, useParams } from 'react-router-dom';
import { editItem, deleteItem, fetchFavoriteItems } from '../../../actions';

import moment from 'moment';
import 'moment/locale/ko';

export default ({
  itemId,
  complete,
  content,
  userId,
  userNick,
  createDate,
  modifyDate,
  profilepic,
  groupId,
  itemGroupTitle,
  itemGroupColor,
  favorite,
  status,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleClick = async (e) => {
    await dispatch(
      editItem(e.target.parentElement.id, id ? id : groupId, e.target.id)
    );
    await dispatch(fetchFavoriteItems());
  };

  const handleDeleteClick = async (e) => {
    await dispatch(deleteItem(e.target.parentElement.id, groupId));
  };

  const itemTime = (createDate, modifyDate) => {
    if (createDate === modifyDate) {
      return `${moment(createDate).locale('ko').fromNow()} 등록`;
    } else {
      return `${moment(modifyDate).locale('ko').fromNow()} 변경`;
    }
  };

  const detailTime = (createDate, modifyDate) => {
    if (createDate === modifyDate) {
      return `${moment(createDate).locale('ko').format('LLLL')}`;
    } else {
      return `${moment(modifyDate).locale('ko').format('LLLL')}`;
    }
  };

  return [
    <div
      className={`todo-item ${itemId} ${complete}`}
      id={`${itemId}`}
      key={`${itemId}`}
    >
      {`${complete}` === 'true' ? (
        <CheckCircleOutlineIcon
          fontSize='large'
          id='complete'
          onClick={handleClick}
        />
      ) : (
        <RadioButtonUncheckedIcon
          fontSize='large'
          id='complete'
          onClick={handleClick}
        />
      )}
      <span className='item-content'>{content}</span>
      {`${status}` === 'true' ? (
        <DeleteIcon className='item-delete' onClick={handleDeleteClick} />
      ) : (
        <RestoreIcon
          className='item-delete'
          id='status'
          onClick={handleClick}
        />
      )}

      <span className='item-time' title={detailTime(createDate, modifyDate)}>
        <small>{itemTime(createDate, modifyDate)}</small>
      </span>
      <span className='item-user'>
        <small>made by </small>
        {userNick}
      </span>
      <img
        id={`profile ${userId}`}
        key={profilepic === 'true' ? `profile ${userId}` : `profile basic`}
        src={
          profilepic === 'true'
            ? `/images/profileimg/${userId}.png?t=${Date.now()}`
            : `/images/profileimg/basic.png`
        }
      />
      <Link to={`/groups/${groupId}`}>
        <span
          className='item-grouptitle'
          style={{ backgroundColor: `${itemGroupColor}` }}
        >
          <small>{itemGroupTitle}</small>
        </span>
      </Link>
      {`${favorite}` === 'true' ? (
        <FavoriteIcon
          fontSize='large'
          style={{ color: 'red' }}
          id='favorite'
          onClick={handleClick}
        />
      ) : (
        <FavoriteBorderIcon
          fontSize='large'
          style={{ color: 'red' }}
          id='favorite'
          onClick={handleClick}
        />
      )}
    </div>,
  ];
};
