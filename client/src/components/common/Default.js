import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { fetchUser, fetchGroup } from '../../actions';
import { Route, Redirect } from 'react-router-dom';
import Loading from './Loading';
import Intro from '../routers/Intro';
import Home from '../routers/Home';

export default () => {
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    fetchUser();
  });

  const renderContent = () => {
    switch (auth) {
      case null:
        return <Loading />;
      case false:
        return (
          <React.Fragment>
            <Route exact path='/login' component={Intro} />
            <Redirect to='/login' />
          </React.Fragment>
        );
      default:
        return;
    }
  };
  return <React.Fragment>{renderContent()}</React.Fragment>;
};
