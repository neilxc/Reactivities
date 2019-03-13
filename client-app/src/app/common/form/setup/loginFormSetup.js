import authStore from "../../../stores/authStore";
import { routingStore as router } from "../../../../index";
import modalStore from "../../../stores/modalStore";

const fields = {
  fields: ["email", "password"],
  labels: { email: "Email", password: "Password" },
  placeholders: { email: "Email Address", password: "Password" },
  rules: { email: "required|email", password: "required" }
};

const hooks = {
  hooks: {
    onInit(form) {
      form.$('email').focus();
    },
    async onSuccess(form) {
      try {
        await authStore.login(form.values());
        modalStore.closeModal();
        router.push("/activities");
      } catch (error) {
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
