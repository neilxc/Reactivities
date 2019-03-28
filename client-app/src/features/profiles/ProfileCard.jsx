import React from 'react';
import { Link } from 'react-router-dom';
import { Card,  Image } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';

export default inject('authStore')(
  observer(({ authStore: { user }, profile }) => (
    <Card>
      <Image src={`${profile.image || '/assets/user.png'}`} size='medium' />
      <Card.Content>
        <Card.Header as={Link} to={`/profile/${profile.username}`}>
          {profile.displayName}
          {/* {user.username !== profile.username && (
            <ProfileFollowButtons profile={profile} />
          )} */}
        </Card.Header>
      </Card.Content>
    </Card>
  ))
);
