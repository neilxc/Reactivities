import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Segment, List, Item, Label, Image } from 'semantic-ui-react';

const ActivityDetailsSidebar = ({ attendees }) => (
  <Fragment>
    <Segment
      textAlign='center'
      style={{ border: 'none' }}
      attached='top'
      secondary
      inverted
      color='teal'
    >
      {attendees && attendees.length}{' '}
      {attendees && attendees.length === 1 ? 'Person' : 'People'} going
    </Segment>
    <Segment attached>
      <List relaxed divided>
        {attendees && attendees.map(attendee => (
          <Item key={attendee.username} style={{ position: 'relative' }}>
            {attendee.isHost &&
            <Label
              style={{ position: 'absolute' }}
              color='orange'
              ribbon='right'
            >
              Host
            </Label>}
            <Image size='tiny' src={attendee.image || '/assets/user.png'} />
            <Item.Content verticalAlign='middle'>
              <Item.Header as='h3'>
                <Link to={`#`}>{attendee.displayName}</Link>
              </Item.Header>
              {/* <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra> */}
            </Item.Content>
          </Item>
        ))}
      </List>
    </Segment>
  </Fragment>
);

export default observer(ActivityDetailsSidebar);
