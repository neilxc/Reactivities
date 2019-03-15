import { observable, action, computed, configure, runInAction } from 'mobx';
import agent from '../api/agent';
import { routingStore } from '../../index';
import authStore from './authStore';
import { setActivityProps, createAttendee } from '../common/util/util';

configure({ enforceActions: 'always' });

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
      const user = authStore.user;
      runInAction('Populate activity registry', () => {
        activities.forEach(activity => {
          activity = setActivityProps(activity, user);
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

  @action loadActivity = async (id, acceptCached = false) => {
    if (!id) return null;
    if (acceptCached) {
      const activity = this.getActivity(id);
      if (activity) {
        runInAction('Setting activity from cache', () => {
          this.activity = activity;
        });
        return activity;
      }
    }
    this.loadingActivity = true;
    try {
      let activity = await agent.Activities.get(id);
      const user = authStore.user;
      activity = setActivityProps(activity, user);
      runInAction('Setting activity from API', () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.loadingActivity = false;
      });
      return activity;
    } catch (error) {
      runInAction(() => {
        console.log(error);
        this.loadingActivity = false;
      });
    }
  };

  @action clearActivity() {
    this.activity = {};
  }

  @action
  submitActivityForm = async activity => {
    this.loading = true;
    const user = authStore.user;
    try {
      let returnedActivity = activity.id
        ? await agent.Activities.update(activity)
        : await agent.Activities.create(activity);
      returnedActivity = setActivityProps(returnedActivity, user);
      returnedActivity.date = new Date(returnedActivity.date);
      runInAction(() => {
        this.activityRegistry.set(returnedActivity.id, returnedActivity);
        this.loading = false;
        routingStore.push(`/activity/${returnedActivity.id}`);
      });
      return returnedActivity;
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
      throw error;
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
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action attendActivity = async () => {
    const attendee = createAttendee(authStore.user);
    this.loading = true;
    try {
      await agent.Activities.attend(this.activity.id);
      runInAction('Setting attendance', () => {
        this.activity.attendees.push(attendee);
        this.activity.isGoing = true;
        this.activityRegistry.set(this.activity.id, this.activity);
        this.loading = false;
      });
    } catch (err) {
      this.loading = false;
      console.log(err);
    }
  };

  @action cancelAttendance = async () => {
    const user = authStore.user;
    this.loading = true;
    try {
      await agent.Activities.unattend(this.activity.id);
      runInAction('Removing attendance', () => {
        this.activity.attendees = this.activity.attendees.filter(
          a => a.username !== user.username
        );
        this.activity.isGoing = false;
        this.activityRegistry.set(this.activity.id, this.activity);
        this.loading = false;
      });
    } catch (err) {
      this.loading = false;
      console.log(err);
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
        const date = activity.date.toISOString().split('T')[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {})
    );
  }
}

export default new ActivityStore();
