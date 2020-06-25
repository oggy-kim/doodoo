import React from 'react';
import { SubmissionError, Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import InputField from '../components/InputField';

const SimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const FIELDS = [
    { label: '현재 비밀번호', name: 'checkPassword', type: 'password' },
    { label: '새 비밀번호', name: 'password', type: 'password' },
    { label: '비밀번호 확인', name: 'password2', type: 'password' },
  ];

  const renderFields = () => {
    return _.map(FIELDS, ({ name, type, label }) => {
      return (
        <Field
          label={label}
          key={name}
          component={InputField}
          type={type}
          name={name}
        />
      );
    });
  };

  return (
    <form className='change-password-form' onSubmit={handleSubmit}>
      {renderFields()}
      <div className='button-container'>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={pristine}
        >
          변경하기
        </Button>
        <Button
          type='button'
          variant='contained'
          color='secondary'
          disabled={pristine || submitting}
          onClick={reset}
        >
          초기화
        </Button>
      </div>
    </form>
  );
};

const validate = (values) => {
  const errors = {};

  // password
  if (!values.password) {
    errors.password = '입력이 필요합니다.';
  } else if (values.password.length < 6 || values.password.length > 15) {
    errors.password = '비밀번호는 6자 이상 ~ 15자 미만으로 입력해주세요.';
  }

  // Verifying password
  if (!values.password2) {
    errors.password2 = '입력이 필요합니다.';
  } else if (values.password !== values.password2) {
    errors.password2 = '비밀번호가 불일치합니다. 다시 입력해주세요.';
  }
  return errors;
};

export default reduxForm({
  validate,
  form: 'changePassword', // a unique identifier for this form
})(SimpleForm);
