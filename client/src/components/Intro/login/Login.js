import '../../css/Login.css';

import { connect } from 'react-redux';
import _ from 'lodash';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from './LoginForm';
import { signIn, onChange } from '../../../actions';
import SNSList from '../components/SNSList';

class Login extends Component {
  componentDidMount() {
    this.checkLoginStatus();
  }

  onChange = ({ userId, password }) => {
    if (this.props.message !== '') {
      document.querySelector(`.form-field.userId > small`).textContent = '';
      this.props.onChange();
    }
    if (userId) {
      document.querySelector(`.form-field.userId > label`).style.visibility =
        'visible';
    }
    if (password) {
      document.querySelector(`.form-field.password > label`).style.visibility =
        'visible';
    }
  };

  onSubmit = async (formValues) => {
    await this.props.signIn(formValues);
    this.loginValidate();
  };

  loginValidate() {
    if (this.props.message !== '') {
      document.querySelector(
        `.form-field.userId > small`
      ).textContent = this.props.message;
    }
  }

  checkLoginStatus() {
    if (this.props.auth) {
      return <Redirect to='/home' />;
    }
  }

  render() {
    return (
      <div className='intro-container'>
        <img src='/images/icons/doodoo_intro.png' />
        <p>함께 간편하게 할일을 공유하는</p>
        <div className='login-form'>
          <h3>아이디/패스워드로 로그인</h3>
          <LoginForm onChange={this.onChange} onSubmit={this.onSubmit} />
        </div>
        <div className='snslogin-form'>
          <h3>SNS로 로그인</h3>
          <SNSList />
        </div>
        <p>
          아직 회원이 아니세요?{' '}
          <Link to='/user/join'>
            <big style={{ color: 'blue', fontWeight: 700 }}>회원가입</big>
          </Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps({ auth, join }) {
  return {
    message: join.message,
    auth,
  };
}

export default connect(mapStateToProps, { signIn, onChange })(Login);
