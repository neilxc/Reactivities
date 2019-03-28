import { action, observable, runInAction, computed, reaction } from 'mobx';
import agent from '../api/agent';
import { isEmpty } from '../common/util/util';
import authStore from './authStore';
import photoWidgetStore from './photoWidgetStore';
import { setProfileProps } from '../common/util/util';

class ProfileStore {
  constructor() {
    reaction(
      () => this.activeTab,
      activeTab => {
        if (activeTab !== 3 && activeTab !== 4) {
          this.profiles = [];
        }
        if (activeTab === 3) {
          this.loadingFollowings = true;
          agent.Profiles.listFollowings(this.profile.username, true).then(
            action(profiles => {
              this.profiles = profiles;
              this.loadingFollowings = false;
            })
          );
        }
        if (activeTab === 4) {
          this.loadingFollowings = true;
          agent.Profiles.listFollowings(this.profile.username, false).then(
            action(profiles => {
              this.profiles = profiles;
              this.loadingFollowings = false;
            })
          );
        }
      }
    );
  }

  @observable profile = {};
  @observable profiles = [];
  @observable loading = false;
  @observable loadingProfile = false;
  @observable loadingFollowings = false;
  @observable loadingActivities = false;
  @observable loadingPhoto = false;
  @observable clickedButton = null;
  @observable editProfileMode = false;
  @observable editPhotoMode = false;
  @observable addPhotoMode = false;
  @observable activeTab = null;
  @observable userActivities = [];

  @computed get isCurrentUser() {
    return authStore.user.username === this.profile.username;
  }

  @action setActiveTab = (e, data) => {
    this.activeTab = data.activeIndex;
  };

  @action setUserActivityTab = (e, { activeIndex }, username) => {
    this.loadingActivities = true;
    switch (activeIndex) {
      case 1: //past
        agent.UserActivities.past(username).then(
          action(activities => {
            this.userActivities = activities;
            this.loadingActivities = false;
          })
        );
        break;
      case 2: //hosting
        agent.UserActivities.hosting(username).then(
          action(activities => {
            this.userActivities = activities;
            this.loadingActivities = false;
          })
        );
        break;
      default:
        // future
        agent.UserActivities.future(username).then(
          action(activities => {
            this.userActivities = activities;
            this.loadingActivities = false;
          })
        );
        break;
    }
  };

  @action followUser = async username => {
    this.loading = true;
    try {
      await agent.Profiles.follow(username);
      runInAction(() => {
        this.profile.following = true;
        this.loading = false;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => (this.loading = false));
    }
  };

  @action unfollowUser = async username => {
    this.loading = true;
    try {
      await agent.Profiles.unfollow(username);
      runInAction(() => {
        this.profile.following = false;
        this.loading = false;
      });
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  };

  @action loadProfile = async (username, { acceptCached = false } = {}) => {
    if (acceptCached && !isEmpty(this.profile)) return;
    this.loadingProfile = true;
    try {
      let profile = await agent.Profiles.get(username);
      profile = setProfileProps(profile);
      runInAction('getting profile', async () => {
        if (profile.dateOfBirth) profile.date = new Date(profile.dateOfBirth);
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (err) {
      runInAction(() => {
        this.loadingProfile = false;
      });
      console.log(err);
    }
  };

  @action updateProfile = async values => {
    this.loading = true;
    try {
      let profile = await agent.Profiles.update(values);
      profile = setProfileProps(profile);
      runInAction('update profile', () => {
        if (values.displayName !== authStore.user.displayName)
          authStore.user.displayName = values.displayName;
        this.profile = profile;
        this.loading = false;
        this.editProfileMode = false;
      });
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  };

  @action setMainPhoto = async (photo, e) => {
    this.clickedButton = e.target.name;
    this.loadingPhoto = true;
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      runInAction('setting main photo', () => {
        authStore.user.image = photo.url;
        this.profile.photos.find(a => a.isMain).isMain = false;
        this.profile.photos.find(a => a.id === photo.id).isMain = true;
        this.profile.image = photo.url;
        this.loadingPhoto = false;
        this.clickedButton = null;
      });
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.loadingPhoto = false;
        this.clickedButton = null;
      });
    }
  };

  @action deletePhoto = async (photo, e) => {
    this.clickedButton = { name: e.target.name, type: 'delete' };
    console.log(this.clickedButton)
    this.loadingPhoto = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction('deleting photo', () => {
        this.profile.photos = this.profile.photos.filter(
          a => a.id !== photo.id
        );
        if(photo.isMain) {
          authStore.user.image = null;
          this.profile.image = null;
        }
        this.loadingPhoto = false;
        this.clickedButton = null;
      });
    } catch (err) {
      console.log(err);
      runInAction('error deleting photo', () => {
        this.loadingPhoto = false;
        this.clickedButton = null;
      });
    }
  };

  @action toggleEditProfileMode = () => {
    this.editProfileMode = !this.editProfileMode;
  };

  @action toggleEditPhotoMode = () => {
    this.editPhotoMode = !this.editPhotoMode;
  };

  @action toggleAddPhotoMode = () => {
    this.addPhotoMode = !this.addPhotoMode;
  };

  @action addPhoto = async () => {
    this.loadingPhoto = true;
    try {
      const photo = await agent.Profiles.addPhoto(
        photoWidgetStore.croppedImage
      );
      runInAction('adding photo to profile', () => {
        this.profile.photos.push(photo);
        if (photo.isMain) {
          authStore.user.image = photo.url;
          this.profile.image = photo.url;
        }
        this.loadingPhoto = false;
        this.addPhotoMode = false;
        photoWidgetStore.clearImages();
      });
    } catch (err) {
      console.log(err);
      runInAction('error uploading photo', () => {
        this.loadingPhoto = false;
        photoWidgetStore.clearImages();
      });
    }
  };
}

export default new ProfileStore();
