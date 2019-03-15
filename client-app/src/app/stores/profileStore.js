import {action, observable, runInAction} from 'mobx';
import agent from '../api/agent';
import { isEmpty } from '../common/util/util';
import authStore from './authStore';

class ProfileStore {
    @observable profile = {};
    @observable loading = false;
    @observable loadingPhoto = false;
    @observable clickedButton = null;
    @observable imagePreview = null;
    @observable imageCropPreview = null;
    @observable croppedImage = null;
    @observable uploading = null;

    @action loadProfile = async (username, {acceptCached = false} = {}) => {
        if (acceptCached && !isEmpty(this.profile)) return;
        this.loading = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction('getting profile', async () => {
                this.profile = profile;
                this.loading = false;
            })
        } catch (err) {
            runInAction(() => {
                this.loading = false;
            })
            console.log(err);
        }
    }

    @action setMainPhoto = async (photo, e) => {
        this.clickedButton = e.target.name;
        this.loadingPhoto = true;
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            runInAction('setting main photo', () => {
                authStore.user.image = photo.url;
                this.profile.photos.find(a => a.isMain).isMain = false;
                this.profile.photos.find(a => a.id === photo.id).isMain = true;
                this.loadingPhoto = false
                this.clickedButton = null;
            });
        } catch (err) {
            console.log(err);
            runInAction(() => {
                this.loadingPhoto = false;
                this.clickedButton = null;
            });
        }
    }

    @action deletePhoto = async (photo, e) => {
        this.clickedButton = {name: e.target.name, type: 'delete'};
        this.loadingPhoto = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction('deleting photo', () => {
                this.profile.photos = this.profile.photos.filter(a => a.id !== photo.id);
                this.loadingPhoto = false;
                this.clickedButton = null;
            });
        } catch (err) {
            console.log(err);
            runInAction('error deleting photo',() => {
                this.loadingPhoto = false;
                this.clickedButton = null;
            })
        }
    }

    @action addPhoto = async () => {
        this.uploading = true;
        try {
            const photo = await agent.Profiles.addPhoto(this.croppedImage);
            runInAction('adding photo to profile', () => {
                this.profile.photos.push(photo);
                this.uploading= false;
                this.clearImages();
            })
        } catch (err) {
            console.log(err);
            runInAction('error uploading photo', () => {
                this.uploading = false;
                this.clearImages();
            })  
        }
    }

    @action onDropFile = (files) => {
        this.imagePreview = URL.createObjectURL(files[0]);
    }

    @action clearImages = () => {
        window.URL.revokeObjectURL(this.imagePreview);
        window.URL.revokeObjectURL(this.imageCropPreview);
        this.imagePreview = null;
        this.imageCropPreview = null;
    }

    @action setImageCropResult = (blob) => {
        this.imageCropPreview = URL.createObjectURL(blob);
        this.croppedImage = blob;
    }
}

export default new ProfileStore();