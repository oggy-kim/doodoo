import axios from 'axios';
import history from '../history';
import moment from 'moment';

import {
  FETCH_USER,
  SIGN_UP,
  SIGN_ERROR,
  ON_CHANGE,
  TOGGLE_NAV,
  TOGGLE_MODAL,
  TOGGLE_PROFILE,
  TOGGLE_SHARE,
  CREATE_GROUP,
  FETCH_GROUPS,
  FETCH_ITEMS,
  CREATE_ITEM,
  RESET_ITEMS,
  SHOW_SNACKBAR,
  CLOSE_SNACKBAR,
  SHOW_ERROR,
  FETCH_FAVORITE_ITEMS,
  FETCH_WEATHER,
  UPDATE_GPS,
  DELETE_ITEM,
  CHANGE_PASSWORD,
  DELETE_GROUP,
  EDIT_GROUP,
  EDIT_PROFILE,
  SHOW_LONGSNACKBAR,
  REQUEST_SHARE,
  FETCH_MESSAGES,
} from './types';

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/users/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const signIn = (formValues) => async (dispatch) => {
  const res = await axios.post('/api/auth/signin', { ...formValues });
  console.log(res.data.message);
  if (res.data.message || !res.data) {
    dispatch({ type: SIGN_ERROR, payload: res.data });
  } else {
    dispatch({ type: FETCH_USER, payload: res.data });
    history.push('/home');
  }
};

export const signUp = (formValues) => async (dispatch) => {
  const res = await axios.post('/api/users/signup', { ...formValues });
  console.log(res.data);
  if (res.data.user) {
    dispatch({ type: FETCH_USER, payload: res.data.user });
    history.push('/home');
  } else {
    dispatch({ type: SIGN_UP, payload: res.data });
  }
};

export const onChange = () => {
  return {
    type: ON_CHANGE,
  };
};

export const toggleNav = () => {
  return {
    type: TOGGLE_NAV,
  };
};

export const toggleModal = () => {
  return {
    type: TOGGLE_MODAL,
  };
};

export const toggleProfile = () => {
  return {
    type: TOGGLE_PROFILE,
  };
};
export const toggleShareModal = (value) => {
  return {
    type: TOGGLE_SHARE,
    payload: value,
  };
};

export const createGroup = (formValues) => async (dispatch, getState) => {
  if (Object.keys(getState().group).length > 10) {
    dispatch({
      type: SHOW_ERROR,
      payload: '❗ 보유 가능한 최대 두두는 10개입니다 :( ',
    });
  } else {
    const { _id } = getState().auth;
    const res = await axios.post('/api/groups/add', { ...formValues, _id });
    dispatch({ type: CREATE_GROUP, payload: res.data });
    dispatch({
      type: SHOW_SNACKBAR,
      payload: '🎈 새 두두 추가가 완료되었습니다. ',
    });
    dispatch({ type: TOGGLE_MODAL });
  }
};

export const fetchGroup = () => async (dispatch, getState) => {
  const { _id } = getState().auth;
  const res = await axios.get(`/api/groups/user/${_id}`);
  dispatch({ type: FETCH_GROUPS, payload: res.data.myList });
};

export const deleteGroup = (groupId) => async (dispatch) => {
  const res = await axios.delete(`/api/groups/${groupId}`);
  dispatch({ type: DELETE_GROUP, payload: res.data.deletedGroup._id });
  dispatch({ type: SHOW_SNACKBAR, payload: '✅ 두두 삭제가 완료되었습니다. ' });
};

export const editGroup = (groupId, type) => async (dispatch) => {
  const res = await axios.patch(`/api/groups/${groupId}`, { type });
  dispatch({ type: DELETE_GROUP, payload: res.data.result._id });
};

export const fetchItems = (id) => async (dispatch, getState) => {
  dispatch({ type: RESET_ITEMS });
  const res = await axios.get(`/api/groups/${id}`);
  dispatch({ type: FETCH_ITEMS, payload: res.data.groupItems });
};

export const fetchFavoriteItems = () => async (dispatch, getState) => {
  const { _id } = getState().auth;
  const res = await axios.get(`/api/groups/user/${_id}/items/favorite`);
  console.log(res.data);
  dispatch({ type: FETCH_FAVORITE_ITEMS, payload: res.data.favoriteItems });
};

export const createItem = (content, groupId) => async (dispatch, getState) => {
  if (Object.keys(getState().item).length > 20) {
    dispatch({
      type: SHOW_ERROR,
      payload: '❗ 한 두두당 보유 가능한 최대 아이템 갯수는 20개입니다 :( ',
    });
  } else {
    const { _id } = getState().auth;
    const res = await axios.post(`/api/groups/${groupId}/items/add`, {
      content,
      groupId,
      _id,
    });
    dispatch({ type: CREATE_ITEM, payload: res.data.addedItem[0] });
    dispatch({
      type: SHOW_SNACKBAR,
      payload: '✅ 아이템 추가가 완료되었습니다. ',
    });
  }
};

export const editItem = (itemId, groupId, changedValue) => async (dispatch) => {
  const res = await axios.patch(`/api/groups/${groupId}/items/${itemId}`, {
    changedValue,
  });
  dispatch({ type: FETCH_ITEMS, payload: res.data.groupItems });
  dispatch({ type: SHOW_SNACKBAR, payload: '✅ 변경이 완료되었습니다. ' });
};

export const deleteItem = (itemId, groupId) => async (dispatch) => {
  const res = await axios.delete(`/api/groups/${groupId}/items/${itemId}`);
  dispatch({ type: DELETE_ITEM, payload: itemId });
  dispatch({ type: SHOW_SNACKBAR, payload: '✅ 삭제가 완료되었습니다. ' });
};

export const closeSnackbar = () => {
  return {
    type: CLOSE_SNACKBAR,
  };
};

export const fetchWeatherInfo = (latitude, longitude) => async (dispatch) => {
  const res = await axios.get(
    `/api/weatherinfo?latitude=${latitude}&longitude=${longitude}`
  );
  dispatch({ type: FETCH_WEATHER, payload: res.data });
};

export const updateGPS = (values) => async (dispatch) => {
  dispatch({ type: UPDATE_GPS, payload: values });
};

export const showSnackbar = (content) => async (dispatch) => {
  dispatch({ type: SHOW_SNACKBAR, payload: content });
};

export const showError = (content) => async (dispatch) => {
  dispatch({ type: SHOW_ERROR, payload: content });
};

export const uploadProfilePic = (formData) => async (dispatch, getState) => {
  const { _id } = getState().auth;
  const res = await axios.post(`/api/users/${_id}/addprofilepic`, formData);
  dispatch({
    type: FETCH_USER,
    payload: res.data.user,
  });
  dispatch({
    type: SHOW_SNACKBAR,
    payload: '프로필 사진 변경이 완료되었습니다.',
  });
  dispatch({
    type: TOGGLE_PROFILE,
  });
};

export const editProfile = (formValues) => async (dispatch, getState) => {
  const { _id } = getState().auth;
  const res = await axios
    .patch(`/api/users/${_id}`, {
      ...formValues,
    })
    .catch((error) => {
      if (error.response) {
        dispatch({ type: SHOW_ERROR, payload: error.response.data.message });
      }
    });
  if (res) {
    dispatch({ type: FETCH_USER, payload: res.data.user });
    dispatch({
      type: SHOW_SNACKBAR,
      payload: '😀 정보 변경이 완료되었습니다.',
    });
    history.push('/home');
  }
};

export const joinViaSNS = (formValues) => async (dispatch, getState) => {
  const { _id } = getState().auth;
  const res = await axios
    .patch(`/api/users/signupviasns/`, { ...formValues })
    .catch((error) => {
      if (error.response) {
        dispatch({ type: SHOW_ERROR, payload: error.response.data.message });
      }
    });
  console.log(res);

  if (res) {
    dispatch({ type: FETCH_USER, payload: res.data.user });
    dispatch({
      type: SHOW_SNACKBAR,
      payload: '😀 회원 가입이 완료되었습니다.',
    });
  }
};

export const withdrawUser = () => async (dispatch, getState) => {
  const { _id } = getState().auth;
  const res = await axios.delete(`/api/users/${_id}`);
  dispatch({ type: FETCH_USER, payload: null });
  dispatch({
    type: SHOW_LONGSNACKBAR,
    payload: `${res.data.user.nickname}님, ${
      res.data.deletedGroup
    }개의 두두와 ${
      res.data.deletedItems
    }개의 아이템이 정상 삭제되었습니다. ${moment
      .duration(moment(Date.now()).locale('ko').diff(res.data.user.joinDate))
      .days()}일동안 DOODOO를 이용해주셔서 감사합니다.`,
  });
  history.push('/login');
};

export const requestShare = (formValues) => async (dispatch, getState) => {
  const { _id } = getState().auth;
  const res = await axios.post(`/api/messages/user/${_id}`, { ...formValues });
  if (res.data.success) {
    dispatch({ type: SHOW_SNACKBAR, payload: res.data.message });
    dispatch({ type: FETCH_GROUPS, payload: res.data.myList });
    dispatch({ type: TOGGLE_SHARE });
  }
};

export const fetchMessages = () => async (dispatch, getState) => {
  const { _id } = getState().auth;
  const res = await axios.get(`/api/messages/user/${_id}`);
  dispatch({ type: FETCH_MESSAGES, payload: res.data.message });
};

export const deleteMessage = (messageId) => async (dispatch) => {
  const res = await axios.delete(`/api/messages/${messageId}`);
  if (res.data.success) {
    dispatch({ type: SHOW_SNACKBAR, payload: res.data.message });
    dispatch({ type: FETCH_GROUPS, payload: res.data.myList });
  }
};

export const sendShareResponse = (type, messageId) => async (dispatch) => {
  const res = await axios.post(`/api/messages/${messageId}`, { type });
  console.log(res.data);
  dispatch({ type: FETCH_MESSAGES, payload: res.data.message });
  dispatch({ type: FETCH_GROUPS, payload: res.data.myList });
};
