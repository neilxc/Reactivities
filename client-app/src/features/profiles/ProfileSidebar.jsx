import React, { Fragment } from 'react';
import { Grid, Segment, Label, Button } from 'semantic-ui-react';

export default props => (
  <Grid.Column width={4}>
    <Segment>
      <Fragment>
        <Label color={'green'} attached='top'>
          You are following Bob
        </Label>
        <Button
          loading={false}
          color='teal'
          fluid
          basic
          content='Unfollow user'
        />
      </Fragment>
    </Segment>
  </Grid.Column>
);
