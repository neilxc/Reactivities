import React from "react";
import { Item, Button, Segment, Label } from "semantic-ui-react";
import {Link} from 'react-router-dom';
import format from 'date-fns/format';
import {withContext} from '../../../app/context';

const ActivityList = ({ activitiesByDate, onActivityDelete, loading, target }) => (
  <Segment clearing>
    <Item.Group divided>
      {activitiesByDate.map(activity => (
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
                as={Link}
                to={`/activity/${activity.id}`}
                floated="right"
                basic
                content="View"
                color="blue"
              />
              <Button
                as={Link}
                to={`/manage/${activity.id}`}
                floated="right"
                basic
                content="Edit"
                color="green"
              />
              <Button
                name={activity.id}
                floated="right"
                basic
                content="Delete"
                color="red"
                loading={+target === activity.id && loading}
                onClick={(e) => onActivityDelete(activity.id, e)}
              />
              <Label basic>{activity.category}</Label>
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  </Segment>
);

export default withContext(ActivityList);
