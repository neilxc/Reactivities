import React from 'react';
import {Grid, Segment, Header, Button} from 'semantic-ui-react';

export default ({profile}) => (
  <Grid.Column width={12}>
    <Segment>
      <Grid columns={2}>
        <Grid.Column width={8}>
          <Header content={`About ${profile.displayName}`} />
          <p>
            <strong>Origin: </strong> {'UK'}
          </p>
          <p>bio</p>
        </Grid.Column>
        <Grid.Column width={4} textAlign={'center'}>
          <Header content='Following' />
          <Button size={'large'} content={22} color={'blue'} disabled={false} />
        </Grid.Column>
        <Grid.Column width={4} textAlign={'center'}>
          <Header content='Followers' textAlign={'center'} />
          <Button size={'large'} content={44} disabled={false} color={'blue'} />
        </Grid.Column>
      </Grid>
    </Segment>
  </Grid.Column>
);
