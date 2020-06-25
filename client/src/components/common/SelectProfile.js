import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class SelectProfile extends Component {
  state = {
    src: null,
    crop: {
      unit: '%',
      width: 60,
      aspect: 1 / 1,
    },
    croppedImageUrl: null,
    picBlob: null,
  };
  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'profilepic.png'
      );

      this.setState({ croppedImageUrl });

      this.props.onSubmit(this.state.picBlob);
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        this.setState({ picBlob: blob });
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  handleClick = () => {
    document.getElementById('selectedFile').click();
  };

  handleChange = () => {
    console.log(this.state.picBlob);
    this.props.submit(this.state.picBlob);
  };

  renderPreview = () => {
    if (!this.state.src) {
      return;
    } else {
      return (
        <React.Fragment>
          <small>원하는 부분을 이동해 선택</small>
          {this.state.src && (
            <ReactCrop
              src={this.state.src}
              crop={this.state.crop}
              ruleOfThirds
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
            />
          )}
          <small>미리보기</small>
          <img
            className='profile-preview'
            alt='Crop'
            style={{ borderRadius: '50%' }}
            src={
              this.state.croppedImageUrl
                ? `${this.state.croppedImageUrl}`
                : `/images/profileimg/basic.png`
            }
          />
        </React.Fragment>
      );
    }
  };

  render() {
    const { crop, croppedImageUrl, src } = this.state;
    return (
      <React.Fragment>
        <Button variant='contained' color='primary' onClick={this.handleClick}>
          사진 선택하기
        </Button>
        <Input
          id='selectedFile'
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={this.onSelectFile}
        />
        {this.renderPreview()}
      </React.Fragment>
    );
  }
}

export default SelectProfile;
