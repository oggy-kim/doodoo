import { TOGGLE_MODAL, TOGGLE_PROFILE, TOGGLE_SHARE } from '../actions/types';

const INITIAL_STATE = {
  open: false,
  changeprofilepic: false,
  share: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      if (state.open === false) {
        return {
          ...state,
          open: true,
        };
      } else {
        return {
          ...state,
          open: false,
        };
      }
    case TOGGLE_PROFILE:
      if (state.changeprofilepic === false) {
        return {
          ...state,
          changeprofilepic: true,
        };
      } else {
        return {
          ...state,
          changeprofilepic: false,
        };
      }
    case TOGGLE_SHARE:
      if (state.share === false) {
        return {
          ...state,
          share: true,
          group: action.payload,
        };
      } else {
        return {
          ...state,
          share: false,
        };
      }
    default:
      return state;
  }
}
