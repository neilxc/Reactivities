import { observable, action, computed, configure, runInAction, reaction } from 'mobx';
import agent from '../api/agent';
import { routingStore } from '../../index';
import authStore from './authStore';
import commonStore from './commonStore';
import { setActivityProps, createAttendee } from '../common/util/util';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

configure({ enforceActions: 'always' });

const LIMIT = 3;

class ActivityStore {
  constructor() {
    reaction(
      () => Object.values(this.predicate),
      predicate => {
        this.page = 0;
        this.activityRegistry.clear();
        this.loadActivities()
      }
    )
  }

  @observable activityRegistry = observable(new Map());
  @observable activities = [];
  @observable activity = {};
  @observable loadingInitial = false;
  @observable loadingActivity = false;
  @observable loadingComments = false;
  @observable loading = false;
  @observable target = null;
  @observable.ref hubConnection = null;
  @observable activityCount = 0;
  @observable page = 0;
  @observable predicate = {};
  
  @computed get totalPages() {
    return Math.ceil(this.activityCount / LIMIT);
  }

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append('limit', LIMIT);
    params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
    this.predicate.isGoing && params.append('isGoing', 'true');
    this.predicate.isHost && params.append('isHost', 'true');
    this.predicate.startDate && params.append('startDate', this.predicate.startDate.toISOString());
    return params;
  }

  @action setPredicate = (e, {name}) => {
    switch (name) {
      case 'isGoing':
        this.predicate[name] = this.predicate[name] ? null : true;
        break;
      case 'isHost':
        this.predicate[name] = this.predicate[name] ? null : true;
        break;
      default:
        this.predicate = {}
        break;
    }
  }

  @action setDatePredicate = (date) => {
    this.predicate.startDate = date
  }

  @action createHubConnection(id) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/chat', {accessTokenFactory: () => commonStore.token})
      .configureLogging(LogLevel.Information)
      .build();

    console.log('about to fire start hub connection')

    this.hubConnection
      .start()
      .then(() => console.log(this.hubConnection.id))
      .catch(err => console.log('Error while establishing connection : ', err));

    console.log('connection started');

    this.hubConnection.on('ReceiveComment', comment => {
      console.log('hub activity');
      runInAction(() => {
        this.activity.comments.push(comment);
      })
    });
  }

  @action stopHubConnection = async () => {
    this.hubConnection.stop();
  };

  @action setPage = (page) => {
    this.page = page;
  }

  @action addComment = async values => {
    values.id = this.activity.id;
    try {
      this.hubConnection.invoke('SendComment', values);
    } catch (error) {
      runInAction(() => {
        console.log(error);
      });
    }
  };

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activityEnvelope = await agent.Activities.all();
      const {activities, activityCount} = activityEnvelope;
      const user = authStore.user;
      runInAction('Populate activity registry', () => {
        activities.forEach(activity => {
          activity = setActivityProps(activity, user);
          this.activityRegistry.set(activity.id, activity);
        });
        this.activityCount = activityCount;
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
    return Object.entries(
      activities.reduce((activities, activity) => {
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
