import '../../css/Group.css';

import React from 'react';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';

import ColorSelection from '../../common/ColorSelection';
import validate from '../common/groupValidate';

const GroupCreateForm = ({ handleSubmit }) => {
  return (
    <form className='create-form' onSubmit={handleSubmit}>
      <ColorSelection />
      <Field
        name='title'
        component='input'
        placeholder='그룹 이름(15자 이내) ex) 오늘 하면 좋을 것들'
        autoComplete='off'
      />
      <Field
        name='description'
        component='textarea'
        placeholder={`그룹에 대한 설명 \n ex) 이걸 안하면 삼년은 후회할 것들만 적어봅니다.`}
        style={{ flexGrow: '1', flexShrink: '0', flexBasis: 'auto' }}
      />
      <Button variant='contained' color='primary' type='submit'>
        새 그룹 추가
      </Button>
    </form>
  );
};

export default reduxForm({
  validate,
  form: 'groupCreate',
})(GroupCreateForm);
