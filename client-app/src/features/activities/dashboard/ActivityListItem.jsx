import React from 'react';
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
  Icon,
  Label
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { inject, observer } from 'mobx-react';
import ActivityListItemAttendees from './ActivityListItemAttendees';

const ActivityListItem = ({
  activityStore: { deleteActivity, loading, target },
  activity
}) => (
  <SegmentGroup>
    <Segment>
      <ItemGroup>
        <Item>
          <ItemImage
            style={{ marginBottom: 3 }}
            size={'tiny'}
            circular
            src={activity.host.image || 'assets/user.png'}
          />
          <ItemContent>
            <ItemHeader as={Link} to={`/activity/${activity.id}`}>
              {activity.title}
            </ItemHeader>
            <ItemDescription>
              Hosted by{' '}
              <Link to={`/profile/${activity.host.username}`}>
                {activity.host.displayName}
              </Link>
            </ItemDescription>
            {activity.isHost && (
              <ItemDescription>
                <Label basic color='orange'>
                  You are hosting this activity!
                </Label>
              </ItemDescription>
            )}
            {activity.isGoing && !activity.isHost && (
              <ItemDescription>
                <Label basic color='green'>
                  You are going to this activity!
                </Label>
              </ItemDescription>
            )}
          </ItemContent>
        </Item>
      </ItemGroup>
    </Segment>
    <Segment>
      <span>
        <Icon name='clock' /> {format(activity.date, 'h:mm a')}
        <Icon name='marker' /> {activity.venue}, {activity.city}
      </span>
    </Segment>
    <Segment secondary>
      <ActivityListItemAttendees attendees={activity.attendees} />
    </Segment>
    <Segment clearing>
      <span>{activity.description}</span>
      <Button
        name={activity.id}
        color='red'
        floated='right'
        content='Delete'
        onClick={e => deleteActivity(activity.id, e)}
        loading={loading && +target === activity.id}
      />
      <Button
        as={Link}
        to={`/activity/${activity.id}`}
        color='teal'
        floated='right'
        content='View'
      />
    </Segment>
  </SegmentGroup>
);

export default inject('activityStore')(observer(ActivityListItem));
