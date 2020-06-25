import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {
  createGroup,
  toggleProfile,
  uploadProfilePic,
  editProfile,
} from '../../../actions';
import { connect, useSelector } from 'react-redux';
import SnackBar from '../../home/components/SnackBar';
import axios from 'axios';
import SelectProfile from '../../common/SelectProfile';

const ChangeProfilepicModal = ({ dispatch }) => {
  const { changeprofilepic } = useSelector((state) => state.modal);
  const { _id } = useSelector((state) => state.auth);
  const [pic, setPic] = useState(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setPic({ file: e.target.files[0] });
    console.log(file);
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setPic({ file, photoUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  const handleDeletePic = () => {
    dispatch(editProfile({ profilepic: 'delete' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('img', pic.file);
    dispatch(uploadProfilePic(formData));
  };

  const onChange = (picBlob) => {
    setPic({ file: picBlob });
  };

  const renderContent = (
    <div className='modal change-profile'>
      <h2>프로필 사진 변경</h2>
      <form
        className='change-profilepic-form'
        onSubmit={handleSubmit}
        encType='multipart/form-data'
      >
        <SelectProfile onSubmit={onChange} />
        {pic ? (
          <Button
            variant='contained'
            color='primary'
            style={{ width: '100px' }}
            type='submit'
          >
            업로드
          </Button>
        ) : null}
      </form>
      <Button variant='contained' color='secondary' onClick={handleDeletePic}>
        프로필 사진 삭제
      </Button>
    </div>
  );

  const handleClick = () => {
    dispatch(toggleProfile());
    setPic(null);
  };

  return (
    <React.Fragment>
      <p onClick={handleClick}>프로필 사진 변경</p>
      <Modal
        style={{ zIndex: 10000 }}
        open={changeprofilepic}
        onClose={handleClick}
        closeAfterTransition
      >
        {renderContent}
      </Modal>
    </React.Fragment>
  );
};

export default connect(null)(ChangeProfilepicModal);
