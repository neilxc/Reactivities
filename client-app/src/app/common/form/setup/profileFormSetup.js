import profileStore from '../../../stores/profileStore';

const fields = {
  fields: ['displayName', 'bio'],
  placeholders: {
    displayName: 'Display Name',
    bio: 'Description'
  },
  rules: {
    displayName: 'required'
  }
};

const hooks = {
  hooks: {
    async onSuccess(form) {
      try {
        await profileStore.updateProfile(form.values());
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
