import _ from 'lodash';

import { FETCH_GROUPS, CREATE_GROUP, DELETE_GROUP } from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_GROUPS:
      return {
        ...state,
        ..._.mapKeys(action.payload, '_id'),
      };
    case CREATE_GROUP:
      return {
        ...state,
        [action.payload.myList._id]: action.payload.myList,
      };
    case DELETE_GROUP:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
