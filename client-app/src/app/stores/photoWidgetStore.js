import { action, observable } from 'mobx';

class PhotoWidgetStore {
  @observable imagePreview = null;
  @observable imageCropPreview = null;
  @observable croppedImage = null;

  @action onDropFile = files => {
    this.imagePreview = URL.createObjectURL(files[0]);
  };

  @action clearImages = () => {
    window.URL.revokeObjectURL(this.imagePreview);
    window.URL.revokeObjectURL(this.imageCropPreview);
    this.imagePreview = null;
    this.imageCropPreview = null;
  };

  @action setImageCropResult = blob => {
    this.imageCropPreview = URL.createObjectURL(blob);
    this.croppedImage = blob;
  };
}

export default new PhotoWidgetStore();
