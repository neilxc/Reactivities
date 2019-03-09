import React from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { withContext } from "../../../app/context";

const ActivityDashboard = ({loadingInitial}) => {
  if (loadingInitial)
  return (
    <LoadingComponent inverted={true} content="Loading activities..." />
  );
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>Filters go here</Grid.Column>
    </Grid>
  );
}

export default withContext(ActivityDashboard);
