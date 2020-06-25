import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import Login from '../Intro/login/Login';
import Join from '../Intro/join/Join';
import unsplash from '../../api/unsplash';
import Snackbar from '../home/components/SnackBar';

class Intro extends Component {
  componentDidMount() {
    this.backgroundImage();
    this.renderSnackbar();
  }

  backgroundImage = async () => {
    const response = await unsplash.get('/search/photos', {
      params: { query: 'sky' },
    });

    const todayNum = new Date().getDate() % 10;
    document.getElementById('root').style.backgroundImage = `url(${
      response.data.results[`${todayNum}`].urls.raw
    }&q=80&fm=jpg&fit=max&auto=format)`;
    console.log(response.data.results[`${todayNum}`].description);
    console.log(response.data.results[`${todayNum}`].user.name);
    console.log(response.data.results[`${todayNum}`].user.links.html);

    var background = document.createElement('div');
    background.id = 'unsplash-info';

    var description = document.createElement('div');
    description.className = 'description';
    var descriptionText = document.createTextNode(
      response.data.results[`${todayNum}`].description
    );
    description.appendChild(descriptionText);

    var name = document.createElement('div');
    name.className = 'name';
    var nameText = document.createTextNode(
      response.data.results[`${todayNum}`].user.name
    );
    name.appendChild(nameText);

    var link = document.createElement('a');
    link.href = response.data.results[`${todayNum}`].user.links.html;
    link.classlink = 'link';
    var linkText = document.createTextNode(
      'by ' + response.data.results[`${todayNum}`].user.name
    );
    link.appendChild(linkText);

    document
      .getElementById('root')
      .appendChild(background)
      .appendChild(description);
    document.getElementById('unsplash-info').appendChild(link);
  };

  renderSnackbar = () => {
    if (this.props.snackbar) {
      return (
        <Snackbar
          open={this.props.snackbar.open}
          autoHideDuration={this.props.snackbar.autoHideDuration}
          message={this.props.snackbar.message}
        />
      );
    }
  };

  render() {
    return (
      <BrowserRouter>
        <Route exact path='/login' component={Login} />
        <Route exact path='/user/join' component={Join} />
        {this.renderSnackbar()}
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ auth, snackbar }) {
  return { auth, snackbar };
}

export default connect(mapStateToProps, actions)(Intro);
