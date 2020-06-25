import './css/App.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Default from './common/Default';
import Loading from './common/Loading';
import Intro from './routers/Intro';
import SNSJoin from './Intro/join/SNSJoin';
import NotFound from './common/NotFound';
import Home from './routers/Home';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import history from '../history';

class App extends Component {
  async componentDidMount() {
    await this.props.fetchUser();
    await this.props.fetchGroup();
  }

  async componentDidUpdate() {
    await this.props.fetchUser();
    await this.props.fetchGroup();
  }

  componentDidUpdate() {
    document.getElementById('root').removeAttribute('style');
    if (document.getElementById('unsplash-info')) {
      document.getElementById('unsplash-info').remove();
    }
  }

  renderPath() {
    if (this.props.auth === null) {
      return;
    } else if (!this.props.auth) {
      return <Redirect to='/login' />;
    } else if (this.props.auth.sns && !this.props.auth.status) {
      return <Redirect to='/user/snsjoin' />;
    } else {
      return;
    }
  }

  renderContent() {
    if (this.props.auth === null) {
      return <Loading />;
    } else if (!this.props.auth) {
      return (
        <React.Fragment>
          <Route exact path='/login' component={Intro} />
          <Redirect to='/login' />
        </React.Fragment>
      );
    } else if (this.props.auth.sns && !this.props.auth.status) {
      console.log('SNS 로그인 중!');
      return (
        <React.Fragment>
          <Route component={SNSJoin} />
          <Redirect to='/user/snslogin' />
        </React.Fragment>
      );
    } else {
      console.log('맨 앞');
      return (
        <React.Fragment>
          <Route component={Home} />
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <BrowserRouter history={history}>{this.renderContent()}</BrowserRouter>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(App);
