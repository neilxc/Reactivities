import {action, observable} from 'mobx';

class ModalStore {
    @observable open = false;
    @observable.ref component = null;
    @observable header = undefined;

    @action openModal = (props) => {
        this.open = true;
        this.component = props.component;
        this.header = props.header;
    }

    @action closeModal = () => {
        this.open = false;
        this.component = null;
        this.header = undefined;
    }
}

export default new ModalStore();