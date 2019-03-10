import React, { Component, Fragment } from "react";
import { Provider } from "../context";
import { Container } from "semantic-ui-react";
import { Route, Switch, withRouter } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Header from "../../features/header/Header";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import { NotFound } from "./NotFound";
import { categories } from "../common/form/data/options";
import {combineDateAndTime} from '../common/util/util';
import agent from "../api/agent";

class App extends Component {
  state = {
    activities: [],
    activity: {},
    loadingInitial: false,
    loadingActivity: false,
    loading: false,
    target: null
  };

  componentDidMount() {
    this.setState({ loadingInitial: true });
    agent.Activities.all()
      .then(activities => {
        this.setState({ activities });
      })
      .finally(() => this.setState({ loadingInitial: false }));
  }

  handleActivityCreate = () => {
    const { activity } = this.state;
    const dateAndTime = combineDateAndTime(activity.date, activity.time);
    const {date, time, ...activityToCreate} = this.state.activity;
    this.setState({ loading: true });
    agent.Activities.create({ ...activityToCreate, date: dateAndTime })
      .then(createdActivity => {
        this.setState(({ activities }) => ({
          activities: [...activities, createdActivity]
        }));
      })
      .finally(() => {
        this.setState({ loading: false});
        this.props.history.push(`/activities`);
      });
  };

  handleActivityEdit = () => {
    const { activity } = this.state;
    const dateAndTime = combineDateAndTime(activity.date, activity.time);
    const {date, time, ...activityToUpdate} = this.state.activity;
    this.setState({ loading: true });
    agent.Activities.update({ ...activityToUpdate, date: dateAndTime })
      .then(updatedActivity => {
        this.setState(({ activities }) => ({
          activities: activities.map(a => {
            if (a.id === updatedActivity.id) {
              return { ...updatedActivity };
            } else {
              return a;
            }
          }),
          activity: {}
        }));
      })
      .finally(() => {
        this.setState({ loading: false, activity: {} });
        this.props.history.push(`/activity/${activity.id}`);
      });
  };

  getActivity = id => {
    const activity = Object.assign({}, [...this.state.activities.filter(a => a.id === id)][0]);
    // const activity = [...this.state.activities.filter(a => a.id === id)][0];
    return activity;
  };

  clearActivity = () => {
    this.setState({activity: {}})
  }

  handleActivityDelete = (id, e) => {
    this.setState({ loading: true, target: e.target.name });
    agent.Activities.delete(id)
      .then(() => {
        this.setState(({ activities }) => ({
          activities: activities.filter(a => a.id !== id),
          activity: {}
        }));
      })
      .finally(() => this.setState({ loading: false, target: null }));
  };

  handleLoadActivity = (id, acceptCached = false, isForm = false) => {
    if (acceptCached) {
      this.clearActivity();
      const activity = this.getActivity(id);
      if (!this.handleIsEmpty(activity)) {
        if (isForm) {
          activity.date = new Date(activity.date);
          activity.time = new Date(activity.date);
        } 
        this.setState({ activity });
        return;
      }
    }
    this.setState({ loadingActivity: true });
    return agent.Activities.get(id)
      .then(activity => {
        if (isForm) {
          activity.date = new Date(activity.date);
          activity.time = new Date(activity.date);
        } 
        this.setState({ activity });
      })
      .finally(() => this.setState({ loadingActivity: false }));
  };

  handleIsEmpty = object => Object.keys(object).length === 0;

  handleInitializeForm = (id, acceptCached = false) => {
    if (!id) {
      this.setState({
        activity: {
          title: "",
          description: "",
          category: "",
          date: null,
          time: null,
          city: "",
          venue: ""
        }
      });
      return;
    }
    this.handleLoadActivity(id, acceptCached, true);
  };

  handleDateInputChange = (value, name) => {
    this.setState({
      activity: {
        ...this.state.activity,
        [name]: value
      }
    })
  }

  handleInputChange = name => ({ target: { value } }) => {
    this.setState({
      activity: { ...this.state.activity, [name]: value }
    });
  }

  handleSelectInputChange = (e, data) => {
    this.setState({
      activity: {
        ...this.state.activity,
        category: data.value
      }
    });
  };

  getActivitiesByDate(activities) {
    const sortedActivities = activities.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {})
    );
  }

  getContext = () => ({
    categories,
    loadActivity: this.handleLoadActivity,
    getActivitiesByDate: this.getActivitiesByDate,
    onActivityCreate: this.handleActivityCreate,
    onActivityEdit: this.handleActivityEdit,
    onActivityDelete: this.handleActivityDelete,
    onInputChange: this.handleInputChange,
    onSelectInputChange: this.handleSelectInputChange,
    onDateInputChange: this.handleDateInputChange,
    onFormLoad: this.handleInitializeForm,
    isEmpty: this.handleIsEmpty,
    clearActivity: this.clearActivity,
    ...this.state
  });

  render() {
    return (
      <Provider value={this.getContext()}>
        <Fragment>
          <Route path="/" exact component={HomePage} />
          <Route
            path={"/(.+)"}
            render={() => (
              <Fragment>
                <Header />
                <Container style={{ marginTop: "7em" }}>
                  <Switch key={this.props.location.key}>
                    <Route path="/activities" component={ActivityDashboard} />
                    <Route path="/manage/:id" component={ActivityForm} />
                    <Route path="/createActivity" component={ActivityForm} />
                    <Route path="/activity/:id" component={ActivityDetails} />
                    <Route component={NotFound} />
                  </Switch>
                </Container>
              </Fragment>
            )}
          />
        </Fragment>
      </Provider>
    );
  }
}

export default withRouter(App);
