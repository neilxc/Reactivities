import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
// import data from "../../../app/api/activities.json";
import agent from "../../../app/api/agent";
import LoadingComponent from "../../../app/layout/LoadingComponent";

class ActivityDashboard extends Component {
  state = {
    activities: [],
    selectedActivity: null,
    editMode: false,
    loadingInitial: false,
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

  handleActivitySelect = id =>
    this.setState(({ activities }) => ({
      selectedActivity: activities.find(a => a.id === id),
      editMode: false
    }));

  handleCancelSelectActivity = () =>
    this.setState({
      selectedActivity: null
    });

  handleOpenCreateForm = () => {
    this.setState({
      editMode: true,
      selectedActivity: null
    });
  };

  handleCancelFormEdit = () => {
    this.setState({
      editMode: false,
      selectedActivity: null
    });
  };

  handleActivityCreate = activity => {
    this.setState({ loading: true });
    agent.Activities.create(activity)
      .then(createdActivity => {
        this.setState(({ activities }) => ({
          activities: [...activities, createdActivity],
          editMode: false
        }));
      })
      .finally(() => this.setState({ loading: false }));
  };

  handleActivitySelectEdit = id => {
    this.setState(({ activities }) => ({
      selectedActivity: activities.find(a => a.id === id),
      editMode: true
    }));
  };

  handleActivityEdit = activity => {
    this.setState({ loading: true });
    agent.Activities.update(activity)
      .then(updatedActivity => {
        this.setState(({ activities }) => ({
          activities: activities.map(a => {
            if (a.id === updatedActivity.id) {
              return { ...updatedActivity };
            } else {
              return a;
            }
          }),
          editMode: false,
          selectedActivity: updatedActivity
        }));
      })
      .finally(() => this.setState({ loading: false }));
  };

  handleActivityDelete = (id, e) => {
    this.setState({ loading: true, target: e.target.name });
    agent.Activities.delete(id)
      .then(() => {
        this.setState(({ activities }) => ({
          activities: activities.filter(a => a.id !== id),
          selectedActivity: null,
          editMode: false
        }));
      })
      .finally(() => this.setState({ loading: false, target: null }));
  };

  getActivitiesByDate(activities) {
    const sortedActivities = activities.sort(
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

  render() {
    const {
      activities,
      selectedActivity,
      editMode,
      loadingInitial,
      loading,
      target
    } = this.state;
    const activitesByDate = this.getActivitiesByDate(activities);
    if (loadingInitial)
      return (
        <LoadingComponent inverted={true} content="Loading activities..." />
      );
    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityList
            target={target}
            loading={loading}
            activities={activitesByDate}
            deleteActivity={this.handleActivityDelete}
            selectActivity={this.handleActivitySelect}
            editSelectedActivity={this.handleActivitySelectEdit}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            positive
            content="Create Activity"
            onClick={this.handleOpenCreateForm}
          />
          {editMode ? (
            <ActivityForm
              loading={loading}
              cancelFormEdit={this.handleCancelFormEdit}
              createActivity={this.handleActivityCreate}
              editActivity={this.handleActivityEdit}
              activity={selectedActivity}
              key={selectedActivity ? selectedActivity.id : 0}
            />
          ) : selectedActivity ? (
            <ActivityDetails
              activity={selectedActivity}
              cancelSelectActivity={this.handleCancelSelectActivity}
            />
          ) : null}
        </Grid.Column>
      </Grid>
    );
  }
}

export default ActivityDashboard;
