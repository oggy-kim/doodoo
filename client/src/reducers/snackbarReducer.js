import {
  SHOW_SNACKBAR,
  SHOW_LONGSNACKBAR,
  SHOW_ERROR,
  CLOSE_SNACKBAR,
} from '../actions/types';

const INITIAL_STATE = {
  open: false,
  autoHideDuration: 2000,
  message: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        open: true,
        autoHideDuration: 2000,

        message: action.payload,
      };

    case SHOW_LONGSNACKBAR:
      return {
        open: true,
        autoHideDuration: 5000,
        message: action.payload,
      };
    case SHOW_ERROR:
      return {
        open: true,
        autoHideDuration: 2000,
        message: action.payload,
      };
    case CLOSE_SNACKBAR:
      return {
        open: false,
      };
    default:
      return state;
  }
}
