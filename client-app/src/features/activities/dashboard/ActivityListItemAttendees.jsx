import React from 'react';
import { observer } from 'mobx-react';
import { ListItem, Image, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const styles = {
  borderColor: 'orange',
  borderWidth: 2
};

export default observer(({ attendees }) => (
  <List horizontal>
    {attendees.map(attendee => (
      <ListItem key={attendee.username} as={Link} to={`/profile/${attendee.username}`}>
        <Image
          bordered
          size={'mini'}
          circular
          src={attendee.image || '/assets/user.png'}
          style={attendee.following ? styles : null}
        />
      </ListItem>
    ))}
  </List>
));
