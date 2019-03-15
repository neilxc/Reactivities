import React from 'react';
import {Link} from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import {format} from 'date-fns';

export default ({profile}) => (
  <Card style={{width: 200}}>
    <Image src={`${profile.image || '/assets/user.png'}`} size='large' />
    <Card.Content>
      <Card.Header>{profile.displayName}</Card.Header>
      <Card.Meta>
        <span className='date'>Joined on {format(profile.dateJoined, 'do LLL y')}</span>
      </Card.Meta>
      <Card.Description>
        <Link to={`/profile/${profile.username}`}>View Profile</Link>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Link to={'/nowhere'}>
        <Icon name='user' />
        22 Friends
      </Link>
    </Card.Content>
  </Card>
);
