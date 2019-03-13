import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import dvr from 'mobx-react-form/lib/validators/DVR';

export default class Form extends MobxReactForm {
    plugins() {
        return {
            dvr: dvr(validatorjs)
        }
    }

    options() {
        return {
            defaultGenericError: 'Invalid Data',
            validateOnChange: true,
            validateOnInit: true
        }
    }
}