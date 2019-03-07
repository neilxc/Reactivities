import React from "react";
import { Item, Button, Segment, Label } from "semantic-ui-react";
import format from 'date-fns/format'

const ActivityList = ({ activities, selectActivity, editSelectedActivity, deleteActivity, loading, target }) => (
  <Segment clearing>
    <Item.Group divided>
      {activities.map(activity => (
        <Item key={activity.id}>
          <Item.Content>
            <Item.Header as="a">{activity.title}</Item.Header>
            <Item.Meta>{format(activity.date, 'DD MMM YYYY')} at {format(activity.date, 'HH:mm A')}</Item.Meta>
            <Item.Description>
              <div>{activity.description}</div>
              <div>
                {activity.venue}, {activity.city}
              </div>
            </Item.Description>
            <Item.Extra>
              <Button
                floated="right"
                basic
                content="View"
                color="blue"
                onClick={() => selectActivity(activity.id)}
              />
              <Button
                floated="right"
                basic
                content="Edit"
                color="green"
                onClick={() => editSelectedActivity(activity.id)}
              />
              <Button
                name={activity.id}
                floated="right"
                basic
                content="Delete"
                color="red"
                loading={+target === activity.id && loading}
                onClick={(e) => deleteActivity(activity.id, e)}
              />
              <Label basic>{activity.category}</Label>
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  </Segment>
);

export default ActivityList;
