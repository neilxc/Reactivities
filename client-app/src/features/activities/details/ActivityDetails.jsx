import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { withContext } from "../../../app/context";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

class ActivityDetails extends Component {
  componentDidMount() {
    const { match, loadActivity } = this.props;
    loadActivity(+match.params.id, true);
  }

  componentWillUnmount() {
    this.props.clearActivity();
  }

  render() {
    const { activity, loadingActivity } = this.props;
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

export default withContext(ActivityDetails);
