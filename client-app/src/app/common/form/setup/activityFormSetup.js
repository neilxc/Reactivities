import { categories } from "../data/options";
import { combineDateAndTime } from "../../util/util";
import activityStore from "../../../stores/activityStore";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

const fields = {
  fields: ["title", "description", "category", "date", "time", "city", "venue"],
  labels: {
    title: "Activity Title",
    description: "Description",
    category: "Activity Category",
    date: "Date of Activity",
    time: "Time of activity",
    city: "City",
    venue: "Venue"
  },
  placeholders: {
    title: "Activity Title",
    description: "Description",
    category: "Activity Category",
    date: "Date of Activity",
    time: "Time of activity",
    city: "City",
    venue: "Venue"
  },
  extra: {
    category: categories
  },
  rules: {
    title: "required|between:2,50",
    description: "required",
    category: "required",
    date: "required",
    time: "required",
    city: "required",
    venue: "required"
  }
};

const hooks = {
  hooks: {
    onSuccess(form) {
      const dateAndTime = combineDateAndTime(
        form.$("date").value,
        form.$("time").value
      );
      const { date, time, ...activity } = form.values();
      activityStore.submitActivityForm({ ...activity, date: dateAndTime });
    },
    onError(form) {
      console.log("form errors", form.errors());
    }
  },
  plugins: {
    dvr: dvr(validatorjs)
  },
  options: {
    defaultGenericError: "Invalid Data",
    validateOnChange: true
  }
};

export default {
  fields,
  hooks
};
