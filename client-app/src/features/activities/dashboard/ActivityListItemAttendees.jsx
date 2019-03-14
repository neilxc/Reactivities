import React from 'react';
import { observer } from 'mobx-react';
import { ListItem, Image, List, Popup } from 'semantic-ui-react';
import {format} from 'date-fns';

export default observer(({ attendees }) => (
  <List horizontal>
    {attendees.map(attendee => (
      <ListItem key={attendee.username}>
        <Popup
          trigger={
            <Image
              size={'mini'}
              circular
              src={attendee.image || '/assets/user.png'}
            />
          }
          header={attendee.displayName}
          content={`Joined on ${format(attendee.dateJoined, 'do LLL y')}`}
        />
      </ListItem>
    ))}
  </List>
));
