import '../css/Header.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/icons/List';
import Button from '@material-ui/core/Button';
import variable from '../../config/variable';
import { toggleNav, fetchMessages, sendShareResponse } from '../../actions';
import Loading from '../common/Loading';

class Header extends Component {
  toggleNav = () => {
    this.props.toggleNav();
  };

  componentDidMount() {
    this.props.fetchMessages();
  }

  renderHeader = () => {
    switch (this.props.auth) {
      case null:
        return (
          <div>
            <Loading />
          </div>
        );
      default:
        return (
          <div className='user-setting'>
            <div className='user-info'>
              <p>
                {this.props.auth.nickname} <small>님</small>
              </p>
              <img
                key={
                  this.props.auth.profilepic
                    ? `profile ${this.props.auth._id}`
                    : `profile basic`
                }
                id={`profile ${this.props.auth._id}`}
                alt='profile pic'
                src={
                  this.props.auth.profilepic
                    ? `${variable.imageUrl}/profileimg/${
                        this.props.auth._id
                      }.png?t=${Date.now()}`
                    : `${variable.imageUrl}/profileimg/basic.png`
                }
              />
              <div className='user-bar'>
                <Link to='/account/changepassword'>
                  <p>비밀번호 변경</p>
                </Link>
                <hr />
                <Link to='/managedoodoo'>
                  <p>두두 관리</p>
                </Link>
                <hr />
                <Link to='/account/manageprofile'>
                  <p>프로필 변경</p>
                </Link>
                <hr />
                <p>
                  <a href='/api/users/logout'>로그아웃</a>
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  renderMessageList = () => {
    console.log(this.props.message);
    console.log(Object.keys(this.props.message).length);

    if (this.props.message === null) {
      return <Loading />;
    } else if (Object.keys(this.props.message).length === 0) {
      return '받은 요청이 없습니다.';
    } else {
      let result = [];
      for (let _id in this.props.message) {
        result.push(
          <li
            className={`message ${this.props.message[_id]._id}`}
            key={this.props.message[_id]._id}
          >
            <img
              className='request-user'
              key={
                this.props.message[_id]._user.profilepic
                  ? `profile ${this.props.message[_id]._user._id}`
                  : `profile basic`
              }
              id={`profile ${this.props.message[_id]._user._id}`}
              alt='profile pic'
              title={this.props.message[_id]._user.nickname}
              src={
                this.props.message[_id]._user.profilepic
                  ? `${variable.imageUrl}/profileimg/${
                      this.props.message[_id]._user._id
                    }.png?t=${Date.now()}`
                  : `${variable.imageUrl}/profileimg/basic.png`
              }
            />
            <span className='request-content bubble'>
              <small>{this.props.message[_id].requestMessage}</small>
            </span>
            <span
              className='side-group-color'
              style={{
                backgroundColor: `${this.props.message[_id]._group.groupColor}`,
              }}
            ></span>
            <span className='request-title'>
              <small>{this.props.message[_id]._group.title}</small>
            </span>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='small'
              value={this.props.message[_id]._id}
              id='accept'
              onClick={this.handleRequest}
            >
              수락
            </Button>
            <Button
              type='submit'
              variant='contained'
              color='secondary'
              size='small'
              id='reject'
              value={this.props.message[_id]._id}
              onClick={this.handleRequest}
            >
              거절
            </Button>
          </li>
        );
      }
      return result;
    }
  };

  handleRequest = (e) => {
    this.props.sendShareResponse(e.target.id, e.target.value);
  };

  toggleChange = () => {
    document.querySelector('.message-detail').classList.toggle('show');
  };

  renderMessage = () => {
    switch (this.props.message) {
      case null:
        return <Loading size='10' />;
      default:
        return (
          <div className='message-wrapper'>
            <small>받은 요청</small> &nbsp;
            <div className='total-message' onClick={this.toggleChange}>
              {Object.keys(this.props.message).length}
            </div>
            <div className='message-detail'>{this.renderMessageList()}</div>
          </div>
        );
    }
  };

  render() {
    return (
      <header>
        <Drawer onClick={this.toggleNav} />
        {this.renderMessage()}
        {this.renderHeader()}
      </header>
    );
  }
}

function mapStateToProps({ auth, nav, message }) {
  return { auth, nav, message };
}

export default connect(mapStateToProps, {
  toggleNav,
  fetchMessages,
  sendShareResponse,
})(Header);
