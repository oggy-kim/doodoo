import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import 'react-image-crop/dist/ReactCrop.css';
import SelectProfile from '../../common/SelectProfile';

import FormField from '../components/FormField';
import validate from '../common/validateForm';

const FIELDS = [
  { label: 'ID', name: 'userId', type: 'text' },
  {
    label: '이메일 주소',
    name: 'email',
    type: 'email',
  },
  {
    label: '비밀번호',
    name: 'password',
    type: 'password',
  },
  {
    label: '비밀번호 확인',
    name: 'password2',
    type: 'password',
  },
  { label: '닉네임', name: 'nickname', type: 'text' },
];

class JoinForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ name, type, label }) => {
      return (
        <Field
          label={label}
          key={name}
          type={type}
          component={FormField}
          name={name}
        />
      );
    });
  }

  onSubmit = async (formValues) => {
    if (!formValues.profilepic) {
      formValues.profilepic = false;
    }
    this.props.onSubmit(formValues);
  };

  // onChange = async (croppedImageUrl) => {
  //   this.props.change('profilepic', croppedImageUrl);
  // };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        {this.renderFields()}
        {/* <Field
          name='profilepic'
          onSubmit={this.onChange}
          component={SelectProfile}
        /> */}
        <Button
          variant='contained'
          color='primary'
          type='submit'
          disabled={this.props.pristine || this.props.submitting}
        >
          가입
        </Button>
      </form>
    );
  }
}

export default reduxForm({
  validate,
  form: 'joinForm',
})(JoinForm);
