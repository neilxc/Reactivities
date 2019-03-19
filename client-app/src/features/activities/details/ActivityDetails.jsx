import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsSidebar from './ActivityDetailsSidebar';

@inject('activityStore')
@observer
class ActivityDetails extends Component {
  componentDidMount() {
    const {
      match,
      activityStore: { loadActivity }
    } = this.props;
    loadActivity(+match.params.id, true);
    this.props.activityStore.createHubConnection();
    console.log('details component mounting')
  }

  componentWillUnmount() {
    this.props.activityStore.clearActivity();
    this.props.activityStore.stopHubConnection();
  }

  render() {
    const {
      activityStore: {
        loadingActivity,
        loading,
        activity,
        attendActivity,
        cancelAttendance
      }
    } = this.props;
    if (loadingActivity)
      return <LoadingComponent inverted content='Loading Activity' />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailsHeader
            activity={activity}
            attendActivity={attendActivity}
            cancelAttendance={cancelAttendance}
            loading={loading}
          />
          <ActivityDetailsInfo activity={activity} />
          <ActivityDetailsChat key={activity.id} activity={activity} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailsSidebar attendees={activity.attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default ActivityDetails;
