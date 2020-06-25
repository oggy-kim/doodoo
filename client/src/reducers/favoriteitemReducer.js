import _ from 'lodash';

import { FETCH_FAVORITE_ITEMS } from '../actions/types';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FAVORITE_ITEMS:
      return { ..._.mapKeys(action.payload, '_id') };
    default:
      return state;
  }
};
