import React, {Component} from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { inject, observer } from 'mobx-react';

@inject('activityStore')
@observer
class ActivityDashboard extends Component{
  componentDidMount() {
    this.props.activityStore.loadActivities();
  }

  render() {
    const {activityStore: {loadingInitial}} = this.props;
    if (loadingInitial) return <LoadingComponent content='Loading activities...'/>
    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityList />
        </Grid.Column>
        <Grid.Column width={6}>Filters go here</Grid.Column>
      </Grid>
    );
  }
}

export default ActivityDashboard;
