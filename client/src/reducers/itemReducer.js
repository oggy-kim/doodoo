import _ from 'lodash';

import {
  FETCH_ITEMS,
  CREATE_ITEM,
  RESET_ITEMS,
  DELETE_ITEM,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_ITEMS:
      return null;
    case FETCH_ITEMS:
      return { ..._.mapKeys(action.payload, '_id') };
    case CREATE_ITEM:
      return { [action.payload._id]: action.payload, ...state };
    case DELETE_ITEM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
