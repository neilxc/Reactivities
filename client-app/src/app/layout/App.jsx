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
import agent from "../api/agent";
import format from "date-fns/format";

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
    const {activity} = this.state;
    this.setState({ loading: true });
    agent.Activities.create({...activity})
      .then(createdActivity => {
        this.setState(({ activities }) => ({
          activities: [...activities, createdActivity]
        }));
      })
      .finally(() => {
        this.setState({ loading: false });
        this.props.history.push(`/activities`);
      });
  };

  handleActivityEdit = () => {
    const {activity} = this.state;
    this.setState({ loading: true });
    agent.Activities.update({...activity})
      .then(updatedActivity => {
        this.setState(({ activities }) => ({
          activities: activities.map(a => {
            if (a.id === updatedActivity.id) {
              return { ...updatedActivity };
            } else {
              return a;
            }
          }),
          activity: updatedActivity
        }));
      })
      .finally(() => {
        this.setState({ loading: false });
        this.props.history.push(`/activity/${activity.id}`);
      });
  };

  getActivity = id => {
    return this.state.activities.find(a => a.id === id);
  };

  handleActivityDelete = (id, e) => {
    this.setState({ loading: true, target: e.target.name });
    agent.Activities.delete(id)
      .then(() => {
        this.setState(({ activities }) => ({
          activities: activities.filter(a => a.id !== id),
          activity: null
        }));
      })
      .finally(() => this.setState({ loading: false, target: null }));
  };

  handleLoadActivity = (id, acceptCached = false) => {
    if (acceptCached) {
      const activity = this.getActivity(id);
      if (activity) {
        this.setState({ activity });
        return Promise.resolve(activity);
      }
    }
    this.setState({ loadingActivity: true });
    return agent.Activities.get(id)
      .then(activity => {
        activity.date = format(activity.date, "YYYY-MM-DDTHH:mm");
        this.setState({ activity });
      })
      .finally(() => this.setState({ loadingActivity: false }));
  };

  handleIsEmpty = (object) => Object.keys(object).length === 0;

  handleInitializeForm = (id, acceptCached = false) => {
    if (!id) {
      this.setState({
        activity: {
          title: "",
          description: "",
          category: "",
          date: "",
          city: "",
          venue: ""
        }
      });
      return;
    };
    this.handleLoadActivity(id, acceptCached)
  };

  handleInputChange = name => ({ target: { value } }) =>
    this.setState({
      activity: { ...this.state.activity, [name]: value }
    });

  handleSelectInputChange = (e, data) => {
    this.setState({
      activity: {
        ...this.state.activity,
        category: data.value
      }
    });
  };

  getActivitiesByDate() {
    const sortedActivities = this.state.activities.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return sortedActivities;
    // return Object.entries(
    //   sortedActivities.reduce((activites, activity) => {
    //     const date = activity.date.split("T")[0];
    //     activities[date] = activites[date]
    //       ? [...activities[date], activity]
    //       : [activity];
    //     return activities;
    //   }, {})
    // );
  }

  getContext = () => ({
    categories,
    loadActivity: this.handleLoadActivity,
    activitiesByDate: this.getActivitiesByDate(),
    onActivityCreate: this.handleActivityCreate,
    onActivityEdit: this.handleActivityEdit,
    onActivityDelete: this.handleActivityDelete,
    onInputChange: this.handleInputChange,
    onSelectInputChange: this.handleSelectInputChange,
    onFormLoad: this.handleInitializeForm,
    isEmpty: this.handleIsEmpty,
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
