import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from '@material-ui/core';
import InputField from '../components/InputField';

const RequestShareForm = ({ handleSubmit, pristine, submitting }) => {
  return (
    <React.Fragment>
      <form className='request-share-form' onSubmit={handleSubmit}>
        <div>
          <Field
            name='content'
            component={InputField}
            placeholder='요청메시지(15자 이내)'
            autoComplete='off'
          />
        </div>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          size='small'
          disabled={pristine || submitting}
        >
          요청
        </Button>
      </form>
    </React.Fragment>
  );
};

const validate = (values) => {
  const errors = {};

  if (!values.content) {
    errors.content = '메시지를 입력해주세요.';
  } else if (values.content.length > 15) {
    errors.content = '요청 메시지는 15자 이내로 입력해주세요.';
  }
  return errors;
};

export default reduxForm({
  validate,
  form: 'requestShare',
})(RequestShareForm);
