import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGroup } from '../../../actions';

import Loading from '../../common/Loading';

export default () => {
  const myList = useSelector((state) => state.group);

  const renderMyList = () => {
    if (myList === null) {
      return <Loading />;
    } else {
      let result = [];
      for (let _id in myList) {
        if (!myList[_id]._shareUser) {
          result.push(
            <li className={`group ${myList[_id]._id}`} key={myList[_id]._id}>
              <span
                className='side-group-color'
                style={{ backgroundColor: `${myList[_id].groupColor}` }}
              ></span>
              <Link to={`/groups/${myList[_id]._id}`}>
                <span>{myList[_id].title}</span>
              </Link>
            </li>
          );
        }
      }
      if (result.length === 0) {
        return <li>나만의 두두가 없습니다.</li>;
      }
      return result;
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
            <li className={`group ${myList[_id]._id}`} key={myList[_id]._id}>
              <span
                className='side-group-color'
                style={{ backgroundColor: `${myList[_id].groupColor}` }}
              ></span>
              <Link to={`/groups/${myList[_id]._id}`}>
                <span>{myList[_id].title}</span>
              </Link>
            </li>
          );
        }
      }
      if (result.length === 0) {
        return <li>함께하는 두두가 없습니다.</li>;
      }
      return result;
    }
  };
  return (
    <React.Fragment>
      <ul className='group-list'>
        🧍‍♂️ 나만의 두두
        {renderMyList()}
      </ul>
      <ul className='group-list'>
        👭 함께하는 두두
        {renderSharedList()}
      </ul>
      <li className='recycle-bin'>
        <Link to='/groups/recyclebin'>🗑 휴지통</Link>
      </li>
    </React.Fragment>
  );
};
