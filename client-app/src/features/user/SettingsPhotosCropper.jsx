import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

@inject('profileStore')
@observer
class SettingsPhotosCropper extends Component {
  cropImage = () => {
    const { setImageCropResult } = this.props.profileStore;
    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      setImageCropResult(blob);
    }, 'image/jpeg');
  };

  render() {
    const {
      profileStore: { imagePreview }
    } = this.props;
    return (
      <Cropper
        ref='cropper'
        src={imagePreview}
        style={{ height: 200, width: '100%' }}
        // Cropper.js options
        aspectRatio={1}
        viewMode={0}
        dragMode='move'
        guides={false}
        scalable={true}
        cropBoxMovable={true}
        cropBoxResizable={true}
        crop={this.cropImage}
      />
    );
  }
}

export default SettingsPhotosCropper;
