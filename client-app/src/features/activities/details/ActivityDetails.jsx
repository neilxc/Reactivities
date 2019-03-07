import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import format from 'date-fns/format'

const ActivityDetails = ({ activity, cancelSelectActivity }) => (
  <Card fluid>
    <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span className="date">
          {format(activity.date, "DD MMM YYYY")} at{" "}
          {format(activity.date, "HH:mm A")}
        </span>
      </Card.Meta>
      <Card.Description>
        <div>{activity.description}</div>
        <div>{activity.city}</div>
        <div>{activity.venue}</div>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button basic fluid color="grey" onClick={cancelSelectActivity}>
        Cancel
      </Button>
    </Card.Content>
  </Card>
);

export default ActivityDetails;
