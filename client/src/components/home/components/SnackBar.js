import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { useSelector, useDispatch } from 'react-redux';
import { closeSnackbar } from '../../../actions';

export default ({ open, autoHideDuration, message }) => {
  const dispatch = useDispatch();

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar());
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      message={message}
      onClose={handleClose}
    />
  );
};
