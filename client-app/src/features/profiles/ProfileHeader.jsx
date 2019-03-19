import React from 'react';
import { Grid, Item, Header, Segment, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react';

export default observer(({ profile }) => (
  <Segment>
    <Grid stackable>
      <Grid.Column width={12} verticalAlign='middle'>
        <Item.Group>
          <Item>
            <Item.Image
              avatar
              size='small'
              src={profile.image || '/assets/user.png'}
            />
            <Item.Content verticalAlign='middle'>
              <Header as='h1'>{profile.displayName}</Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Grid.Column>
      <Grid.Column width={4} verticalAlign='bottom'>
        <Button fluid basic animated color='green' attached='bottom'>
          <Button.Content visible>Following</Button.Content>
          <Button.Content hidden>Unfollow</Button.Content>
        </Button>
      </Grid.Column>
    </Grid>
  </Segment>
));
