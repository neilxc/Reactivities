import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import {inject, observer} from 'mobx-react';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

@inject('activityStore')
@observer
class ActivityDetails extends Component {
  componentDidMount() {
    const { match, activityStore: {loadActivity} } = this.props;
    loadActivity(+match.params.id, true);
  }

  componentWillUnmount() {
    // this.props.clearActivity();
  }

  render() {
    const { activityStore: {loadingActivity, activity}} = this.props;
    if (loadingActivity)
      return <LoadingComponent inverted content="Loading Activity" />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailsHeader activity={activity}/>
          <ActivityDetailsInfo activity={activity}/>
          <ActivityDetailsChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailsSidebar />
        </Grid.Column>
      </Grid>
    );
  }
}

export default ActivityDetails;
