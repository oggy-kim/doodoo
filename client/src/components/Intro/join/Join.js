import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { onChange, signUp } from '../../../actions';
import SNSList from '../components/SNSList';
import JoinForm from './JoinForm';

class Join extends Component {
  onChange = () => {
    if (this.props.duplicate !== '') {
      document.querySelector(
        `.form-field.${this.props.duplicate} > small`
      ).textContent = '';
      this.props.onChange();
    }
  };

  onSubmit = async (formValues) => {
    await this.props.signUp(formValues);
    await this.duplicateCheck();
  };

  duplicateCheck() {
    if (this.props.duplicate !== '') {
      document.querySelector(
        `.form-field.${this.props.duplicate} > small`
      ).textContent = this.props.error;
      document
        .querySelector(`.form-field.${this.props.duplicate} > input`)
        .focus();
    }
  }

  render() {
    return (
      <div className='intro-container'>
        <img src='/images/icons/doodoo_intro.png' />
        <p>함께 간편하게 할일을 공유하는</p>
        <div className='snslogin-form'>
          <h3>SNS로 가입</h3>
          <SNSList />
        </div>
        <div className='join-form'>
          <h3>아이디/패스워드로 가입</h3>
          <JoinForm onChange={this.onChange} onSubmit={this.onSubmit} />
        </div>
        <small>
          회원님의 비밀번호는 SHA-512 암호화를 적용하여 안전하게 보호됩니다.
        </small>
      </div>
    );
  }
}

function mapStateToProps({ join }) {
  return {
    duplicate: join.duplicate,
    error: join.error,
  };
}

export default connect(mapStateToProps, { signUp, onChange })(Join);
