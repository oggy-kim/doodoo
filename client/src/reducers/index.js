import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import joinReducer from './joinReducer';
import navReducer from './navReducer';
import groupReducer from './groupReducer';
import itemReducer from './itemReducer';
import snackbarReducer from './snackbarReducer';
import favoriteitemReducer from './favoriteitemReducer';
import weatherReducer from './weatherReducer';
import modalReducer from './modalReducer';
import messageReducer from './messageReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  join: joinReducer,
  nav: navReducer,
  group: groupReducer,
  item: itemReducer,
  snackbar: snackbarReducer,
  favoriteitem: favoriteitemReducer,
  weather: weatherReducer,
  modal: modalReducer,
  message: messageReducer,
});
