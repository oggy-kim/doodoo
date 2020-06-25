import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import { useSelector, connect } from 'react-redux';
import InputField from '../../home/components/InputField';

let ChangeProfileForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const { nickname, email } = useSelector((state) => state.auth);
  const FIELDS = [
    { label: '닉네임', name: 'nickname', type: 'text', placeholder: nickname },
    { label: '이메일', name: 'email', type: 'email', placeholder: email },
  ];

  const renderFields = () => {
    return _.map(FIELDS, ({ name, label, placeholder }) => {
      return (
        <Field
          label={label}
          placeholder={placeholder}
          key={name}
          component={InputField}
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
          disabled={pristine || submitting}
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
  let errors = {};
  // email
  if (!values.email) {
    errors.email = '입력이 필요합니다.';
  } else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.email)) {
    errors.email = '이메일 양식에 맞춰 작성해주세요.';
  }

  if (!values.nickname) {
    errors.nickname = '입력이 필요합니다.';
  } else if (values.nickname.length < 2 || values.nickname.length > 10) {
    errors.nickname = '닉네임은 2자 ~ 10자로 입력해주세요.';
  } else if (!/^[가-힣a-zA-Z0-9]+$/.test(values.nickname)) {
    errors.nickname = '닉네임에 기호는 사용하실 수 없습니다.';
  }
  return errors;
};

ChangeProfileForm = reduxForm({
  validate,
  enableReinitialize: true,
  form: 'changeProfile',
})(ChangeProfileForm);

ChangeProfileForm = connect((state) => ({
  initialValues: state.auth, // pull initial values from account reducer
}))(ChangeProfileForm);

export default ChangeProfileForm;
