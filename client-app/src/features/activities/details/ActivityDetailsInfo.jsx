import React from "react";
import { format, parseISO } from "date-fns";
import { SegmentGroup, Grid, GridColumn, Icon, Segment } from "semantic-ui-react";

const ActivityDetailsInfo = ({ activity }) => (
  <SegmentGroup>
    <Segment attached="top">
      <Grid>
        <GridColumn width={1}>
          <Icon size="large" color="teal" name="info" />
        </GridColumn>
        <GridColumn width={15}>
          <p>{activity.description}</p>
        </GridColumn>
      </Grid>
    </Segment>
    <Segment attached>
      <Grid verticalAlign="middle">
        <Grid.Column width={1}>
          <Icon name="calendar" size="large" color="teal" />
        </Grid.Column>
        <Grid.Column width={15}>
          <span>
            {activity.date && format(parseISO(activity.date), "eeee do MMMM")}{" "}
            at {activity.date && format(parseISO(activity.date), "h:mm a")}
          </span>
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment attached>
      <Grid verticalAlign="middle">
        <GridColumn width={1}>
          <Icon name="marker" size="large" color="teal" />
        </GridColumn>
        <GridColumn width={11}>
          <span>{activity.venue}</span>
        </GridColumn>
      </Grid>
    </Segment>
  </SegmentGroup>
);

export default ActivityDetailsInfo;
