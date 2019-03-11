import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  SegmentGroup,
  Segment,
  ItemContent,
  Header,
  ItemGroup,
  Button,
  Image,
  Item
} from "semantic-ui-react";

const eventImageStyle = {
  filter: "brightness(30%)"
};

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const ActivityDetailsHeader = ({ activity }) => (
  <SegmentGroup>
    <Segment basic attached="top" style={{ padding: "0" }}>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        fluid
        style={eventImageStyle}
      />

      <Segment basic style={eventImageTextStyle}>
        <ItemGroup>
          <Item>
            <ItemContent>
              <Header
                size="huge"
                content={activity.title}
                style={{ color: "white" }}
              />
              <p>
                {activity.date && format(activity.date, "eeee do MMMM")}
              </p>
              <p>
                Hosted by <strong>Bob</strong>
              </p>
            </ItemContent>
          </Item>
        </ItemGroup>
      </Segment>
    </Segment>
    <Segment clearing attached="bottom">
      <Button color="teal">Join Activity</Button>
      <Button>Cancel attendance</Button>
      <Button
        as={Link}
        to={`/manage/${activity.id}`}
        color="orange"
        floated="right"
      >
        Manage Event
      </Button>
    </Segment>
  </SegmentGroup>
);

export default ActivityDetailsHeader;
