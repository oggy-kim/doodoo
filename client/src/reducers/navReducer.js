import { TOGGLE_NAV } from '../actions/types';

export default function (state = { open: true }, action) {
  switch (action.type) {
    case TOGGLE_NAV:
      if (state.open === false) {
        return {
          open: true,
        };
      } else {
        return {
          open: false,
        };
      }
    default:
      return state;
  }
}
