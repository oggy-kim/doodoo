import '../../css/Group.css';

import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import GroupCreateForm from './GroupCreateForm';
import { createGroup, toggleModal } from '../../../actions';
import { connect, useSelector } from 'react-redux';
import SnackBar from '../../home/components/SnackBar';

const GroupCreateModal = ({ dispatch }) => {
  const { open } = useSelector((state) => state.modal);

  const onSubmit = async (values) => {
    await dispatch(createGroup(values));
  };

  const renderContent = (
    <div className='modal creategroup'>
      <h2>새 두두 추가</h2>
      <GroupCreateForm onSubmit={onSubmit} />
    </div>
  );

  const handleClick = () => {
    dispatch(toggleModal());
  };
  return (
    <React.Fragment>
      <Button variant='contained' color='primary' onClick={handleClick}>
        + 새 그룹 추가
      </Button>
      <Modal
        style={{ zIndex: 10000 }}
        open={open}
        onClose={handleClick}
        closeAfterTransition
      >
        {renderContent}
      </Modal>
    </React.Fragment>
  );
};

export default connect(null)(GroupCreateModal);
