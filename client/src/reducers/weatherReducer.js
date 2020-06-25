import { FETCH_WEATHER, UPDATE_GPS } from '../actions/types';

const INITIAL_STATE = {
  address: null,
  latitude: null,
  longitude: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_WEATHER:
      return { ...state, ...action.payload };
    case UPDATE_GPS:
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    default:
      return state;
  }
}
