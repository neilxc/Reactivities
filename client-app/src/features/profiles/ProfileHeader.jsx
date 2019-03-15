import React from 'react';
import { Grid, Item, Header, Segment } from 'semantic-ui-react';

export default ({profile}) => (
  <Grid.Column width={16}>
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image avatar size='small' src={profile.image || '/assets/user.png'} />
          <Item.Content verticalAlign='bottom'>
            <Header as='h1'>{profile.displayName}</Header>
            <br />
            <Header as='h3'>Member Since</Header>
            <br />
            <Header as='h3'>21</Header>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  </Grid.Column>
);
