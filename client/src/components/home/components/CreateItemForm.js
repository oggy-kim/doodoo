import React from 'react';
import { Field, reduxForm, getFormMeta, getFormSyncErrors } from 'redux-form';
import Button from '@material-ui/core/Button';
import validate from '../common/validateItem';
import InputField from '../components/InputField';

const CreateItemForm = ({ handleSubmit, pristine, submitting, groupList }) => {
  const renderGroupOption = () => {
    if (!groupList) {
      return;
    } else {
      let result = [];
      for (let _id in groupList) {
        result.push(
          <option key={`${groupList[_id]._id}`} value={`${groupList[_id]._id}`}>
            {groupList[_id].title}
          </option>
        );
      }
      return (
        <Field name='groupId' component='select'>
          <option>저장할 두두 선택</option>
          {result}
        </Field>
      );
    }
  };

  return (
    <React.Fragment>
      <form className='create-item-form' onSubmit={handleSubmit}>
        {renderGroupOption()}
        <Field
          name='content'
          component={InputField}
          placeholder='아이템(30자 이내)을 입력 후 추가해주세요!    ex) 성남FC 경기 예매하기, 능이버섯 장보기'
          autoComplete='off'
        />
        <Button
          variant='contained'
          color='primary'
          type='submit'
          disabled={pristine || submitting}
        >
          추가
        </Button>
      </form>
    </React.Fragment>
  );
};

export default reduxForm({
  validate,
  form: 'itemCreate',
})(CreateItemForm);
