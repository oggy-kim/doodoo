import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import _ from 'lodash';

import FormField from '../components/FormField';
import validate from '../common/validateForm';

const FIELDS = [
  { label: 'ID', name: 'userId', type: 'text' },
  { label: '비밀번호', name: 'password', type: 'password' },
];

class LoginForm extends Component {
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

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className='login-form'
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        {this.renderFields()}
        <Button
          variant='contained'
          color='primary'
          type='submit'
          disabled={this.props.pristine || this.props.submitting}
        >
          로그인
        </Button>
      </form>
    );
  }
}

export default reduxForm({
  validate,
  form: 'loginForm',
})(LoginForm);
