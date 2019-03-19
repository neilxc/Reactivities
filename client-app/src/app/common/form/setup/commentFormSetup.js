import activityStore from '../../../stores/activityStore';

const fields = {
  fields: ['body'],
  placeholders: {
    body: 'Enter your comment'
  },
  rules: {
    body: 'required'
  }
};

const hooks = {
  hooks: {
    onInit(form) {
      form.state.options.set({validatePristineFields: false});
    },
    onSuccess(form) {
      activityStore.addComment(form.values()).then(() => form.clear());
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
