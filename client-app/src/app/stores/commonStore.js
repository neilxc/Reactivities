import { observable, action, reaction } from "mobx";

class CommonStore {
    constructor() {
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        );
    }

    @observable token = window.localStorage.getItem('jwt');
    @observable appLoaded = false;

    @action setToken(token) {
        this.token = token;
    }

    @action setAppLoaded() {
        this.appLoaded = true;
    }
}

export default new CommonStore();