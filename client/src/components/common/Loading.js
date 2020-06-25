import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default ({ size = 30 }) => {
  return (
    <div className='spinner'>
      <CircularProgress size={size} />
    </div>
  );
};
