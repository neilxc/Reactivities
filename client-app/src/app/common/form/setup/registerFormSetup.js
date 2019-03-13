import authStore from '../../../stores/authStore';
import { routingStore as router } from '../../../../index';
import modalStore from '../../../stores/modalStore';

const fields = {
  fields: ['displayName', 'email', 'username', 'password', 'confirmPassword'],
  labels: {
    displayName: 'Display Name',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password'
  },
  placeholders: {
    displayName: 'Display Name',
    email: 'Email Address',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm password'
  },
  rules: {
    displayName: 'required',
    username: 'required',
    email: 'required|email',
    password: 'required',
    confirmPassword: 'required|same:password'
  }
};

const hooks = {
  hooks: {
    async onSuccess(form) {
      try {
        await authStore.register(form.values());
        modalStore.closeModal();
        router.push('/activities');
      } catch (error) {
        console.log(error);
        form.invalidate(error);
        form.each(field => {
          field.debouncedValidation.cancel();
        });
      }
    },
    onError(form) {
      console.log(form.errors());
    }
  }
};

export default {
  fields,
  hooks
};
