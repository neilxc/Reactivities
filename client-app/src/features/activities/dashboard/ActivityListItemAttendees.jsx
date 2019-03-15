import React from 'react';
import { observer } from 'mobx-react';
import { ListItem, Image, List, Popup } from 'semantic-ui-react';
// import {format} from 'date-fns';
import ProfileCard from '../../profiles/ProfileCard';

export default observer(({ attendees }) => (
  <List horizontal>
    {attendees.map(attendee => (
      <ListItem key={attendee.username}>
        <Popup
          hoverable={true}
          trigger={
            <Image
              size={'mini'}
              circular
              src={attendee.image || '/assets/user.png'}
            />
          }
        >
          <ProfileCard profile={attendee} />
        </Popup>
      </ListItem>
    ))}
  </List>
));
