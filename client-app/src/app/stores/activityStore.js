import { observable, action, computed, configure, runInAction } from "mobx";
import agent from "../api/agent";
import { routingStore } from "../../index";

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

  @action initializeForm = (id, acceptCached = false) => {
    if (!id) {
      return Promise.resolve(null);
    }
    return this.loadActivity(id, acceptCached, true);
  };

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
      });
      return Promise.resolve(activity);
    } catch (error) {
      runInAction(() => {
        this.loadingActivity = false;
      });
    }
  };

  @action
  submitActivityForm = async activity => {
    this.loading = true;
    try {
      const returnedActivity = activity.id
        ? await agent.Activities.update(activity)
        : await agent.Activities.create(activity);
      returnedActivity.date = new Date(returnedActivity.date);
      runInAction(() => {
        this.activityRegistry.set(returnedActivity.id, returnedActivity);
        this.loading = false;
        routingStore.push(`/activity/${returnedActivity.id}`);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
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
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
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
}

export default new ActivityStore();
