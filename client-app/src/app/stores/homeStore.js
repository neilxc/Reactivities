import { observable, computed, action } from "mobx";
import {routingStore} from '../../index';

class HomeStore {
  @observable title = "Hello from Mobx";
  @observable isLoggedIn = false;
  @observable user = null;

  @computed
  get name() {
    if (!this.user) return null;
    return this.user.firstName + " " + this.user.lastName;
  }

  @action
  login = () => {
    this.user = {
      firstName: "Thierry",
      lastName: "Henry",
      image:
        "https://static.independent.co.uk/s3fs-public/thumbnails/image/2012/12/16/22/Pg-9s-wallace-getty.jpg?w968h681"
    };
    this.isLoggedIn = true;
    routingStore.push('/activities');
  };

  @action
  logout = () => {
    this.user = null;
    this.isLoggedIn = false;
    routingStore.push('/');
  };
}

export default new HomeStore();
