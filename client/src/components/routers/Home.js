import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { Router as BrowserRouter, Redirect, Route } from 'react-router-dom';
import history from '../../history';
import { useSelector } from 'react-redux';

import Header from '../home/Header';
import Aside from '../home/Aside';
import Dashboard from '../home/Dashboard';
import GroupCreateModal from '../home/groups/GroupCreateModal';
import GroupDetail from '../home/groups/GroupDetail';
import { fetchUser, fetchGroup } from '../../actions';
import Default from '../common/Default';
import SnackBar from '../home/components/SnackBar';
import ChangePassword from '../home/settings/ChangePassword';
import ManageDoodoo from '../home/settings/ManageDoodoo';
import ManageProfile from '../home/settings/ManageProfile';

export default () => {
  const { open, autoHideDuration, message } = useSelector(
    (state) => state.snackbar
  );

  return (
    <React.Fragment>
      <Default />
      <BrowserRouter history={history}>
        <Route exact path='/groups/create' component={GroupCreateModal} />
        <Container id='container'>
          <Aside />
          <div className='main'>
            <Header />
            <Route exact path='/groups/:id' component={GroupDetail} />
            <Route exact path='/home' component={Dashboard} />
            <Route
              exact
              path='/account/changepassword'
              component={ChangePassword}
            />
            <Route exact path='/managedoodoo' component={ManageDoodoo} />
            <Route
              exact
              path='/account/manageprofile'
              component={ManageProfile}
            />
          </div>
          <SnackBar
            open={open}
            autoHideDuration={autoHideDuration}
            message={message}
          />
        </Container>
        {/* <Redirect exact path='/' to='/home' /> */}
        {/* <Redirect path='*' to='/home' /> */}
      </BrowserRouter>
    </React.Fragment>
  );
};
