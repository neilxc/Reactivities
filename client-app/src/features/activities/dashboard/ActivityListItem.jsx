import React from "react";
import {
  Button,
  Item,
  SegmentGroup,
  Segment,
  ItemGroup,
  ItemImage,
  ItemContent,
  ItemHeader,
  ItemDescription,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { withContext } from "../../../app/context";

const ActivityListItem = ({
  activity,
  selectActivity,
  target,
  loading,
  onActivityDelete
}) => (
  <SegmentGroup>
    <Segment>
      <ItemGroup>
        <Item>
          <ItemImage size={"tiny"} circular src={"assets/user.png"} />
          <ItemContent>
            <ItemHeader as={Link} to={`/activity/${activity.id}`}>
              {activity.title}
            </ItemHeader>
            <ItemDescription>Hosted by Bob</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </Segment>
    <Segment>
      <span>
        <Icon name="clock" /> {format(parseISO(activity.date), "h:mm a")}
        <Icon name="marker" /> {activity.venue}, {activity.city}
      </span>
    </Segment>
    <Segment secondary>Attendees will go in here</Segment>
    <Segment clearing>
      <span>{activity.description}</span>
      <Button
        as={Link}
        to={`/activity/${activity.id}`}
        color="teal"
        floated="right"
        content="View"
      />
    </Segment>
  </SegmentGroup>
);

export default withContext(ActivityListItem);
