import { SIGN_UP, ON_CHANGE, SIGN_ERROR } from '../actions/types';

export default function (
  state = { error: '', duplicate: '', message: '' },
  action
) {
  switch (action.type) {
    case ON_CHANGE:
      return {
        error: '',
        duplicate: '',
        message: '',
      };
    case SIGN_UP:
      return {
        error: action.payload.error,
        duplicate: action.payload.duplicate,
      };
    case SIGN_ERROR:
      return {
        message: action.payload.message,
      };
    default:
      return state;
  }
}
