import {observable, action, runInAction, computed} from 'mobx';
import agent from '../api/agent';
import commonStore from './commonStore';
// import modalStore from './modalStore';
import {routingStore as router} from '../../index';
import { th } from 'date-fns/esm/locale';

class AuthStore {
    @observable loading = false;
    @observable user = null;

    @computed get isLoggedIn() {return !!this.user};

    @action login = async (values) => {
        this.loading = true;
        try {
            const user = await agent.Users.login(values.email, values.password);
            runInAction("LoginOk - Setting token", () => {
                commonStore.setToken(user.token);
                this.user = user;
                this.loading = false;
                // modalStore.closeModal();
            })
        } catch (err) {
            console.log(err);
            runInAction(() => {
                this.loading = false;
            })
            throw err;
        }
    }

    @action register = async (values) => {
        this.loading = true;
        try {
            const user = await agent.Users.register({...values});
            runInAction("RegisterUserAction", () => {
                commonStore.setToken(user.token);
                this.user = user;
                this.loading = false;
            })
        } catch (error) {
            runInAction(("registerError"), () => {
                this.loading = false;
            })
            throw error;
        }
    }

    @action logout = () => {
        commonStore.setToken(undefined);
        this.user = null;
        router.push('/');
    }

    @action getUser = async () => {
        this.loading = true;
        try {
            const user = await agent.Users.current();
            runInAction(() => {
                this.user = user;
                this.loading = false;
            })
            return user;
        } catch (err) {
            console.log(err);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}

export default new AuthStore();