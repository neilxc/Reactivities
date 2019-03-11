import { observable, action, computed, configure, runInAction } from "mobx";
import agent from "../api/agent";
import { combineDateAndTime } from "../common/util/util";
import {routingStore} from '../../index';

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = observable(new Map());
  @observable activities = [];
  @observable activity = {};
  @observable loadingInitial = false;
  @observable loadingActivity = false;
  @observable loading = false;
  @observable target = null;

  @action async loadActivities() {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.all();
      runInAction(() => {
        activities.forEach(activity => {
          activity.date = new Date(activity.date);
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  }

  @action loadActivity = async (id, acceptCached = false, isForm = false) => {
    if (acceptCached) {
      const activity = this.getActivity(id);
      if (activity) {
        if (isForm) {
          activity.time = activity.date;
        }
        this.activity = activity;
        return Promise.resolve(activity);
      }
    }
    this.loadingActivity = true;
    try {
      const activity = await agent.Activities.get(id);
      activity.date = new Date(activity.date);
      if (isForm) {
        activity.time = activity.date;
      }
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.loadingActivity = false;
        return activity;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingActivity = false;
      });
    }
  };

  @action
  submitActivityForm = async () => {
    console.log(routingStore);
    const dateAndTime = combineDateAndTime(
      this.activity.date,
      this.activity.time
    );
    const { date, time, ...activityToSend } = this.activity;
    this.loading = true;
    try {
      const activity = this.activity.id
        ? await agent.Activities.update({
            ...activityToSend,
            date: dateAndTime
          })
        : await agent.Activities.create({
            ...activityToSend,
            date: dateAndTime
          });
      activity.date = new Date(activity.date);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.loading = false;
        routingStore.push(`/activity/${activity.id}`);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
          this.loading = false;
      })
    }
  };

  @action
  deleteActivity = async (id, e) => {
      this.loading = true;
      this.target = e.target.name;
    try {
        await agent.Activities.delete(id);
        runInAction(() => {
            this.activityRegistry.delete(id);
            this.loading = false;
            this.target = null;
        })
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
  };

  @action initializeForm = (id, acceptCached = false) => {
    if (!id) {
      this.activity = {
        title: "",
        description: "",
        category: "",
        date: null,
        time: null,
        city: "",
        venue: ""
      };
      return;
    }
    this.loadActivity(id, acceptCached, true);
  };

  getActivity(id) {
    return this.activityRegistry.get(id);
  }

  @computed get activitiesByDate() {
    return this.getActivitiesByDate(Array.from(this.activityRegistry.values()));
  }

  getActivitiesByDate(activities) {
    const sortedActivities = activities
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.toISOString().split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {})
    );
  }

  @action
  dateInputChange = (value, name) => {
    this.activity = { ...this.activity, [name]: value };
  };

  @action
  inputChange = name =>
    action(({ target: { value } }) => {
      this.activity = { ...this.activity, [name]: value };
    });

  @action
  selectInputChange = (e, data) => {
    this.activity = { ...this.activity, category: data.value };
  };
}

export default new ActivityStore();
