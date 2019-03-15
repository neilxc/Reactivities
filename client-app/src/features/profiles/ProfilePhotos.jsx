import React from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';

export default ({ photos }) => (
  <Grid.Column width={12}>
    <Segment attached>
      <Header icon='image' content='Photos' />
      <Image.Group size='small'>
        {photos.map(photo => (
          <Image key={photo.id} src={photo.url} />
        ))}
      </Image.Group>
    </Segment>
  </Grid.Column>
);
