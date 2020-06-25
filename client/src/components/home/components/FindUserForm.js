import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from '../common/validateItem';
import { Button } from '@material-ui/core';
import InputField from '../components/InputField';

const FindUserForm = ({ handleSubmit, pristine, submitting }) => {
  return (
    <React.Fragment>
      <form className='find-user-form' onSubmit={handleSubmit}>
        <div>
          <Field
            name='nickname'
            type='text'
            component={InputField}
            placeholder='닉네임 입력(10자 이내)'
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
          검색
        </Button>
      </form>
    </React.Fragment>
  );
};

export default reduxForm({
  validate,
  form: 'findUser',
})(FindUserForm);
