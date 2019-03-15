import React from 'react';
import {Grid, Segment, Header, Tab, Card, Image} from 'semantic-ui-react';
import {format} from 'date-fns';
import {Link} from 'react-router-dom';

export default ({panes}) => (
  <Grid.Column width={12}>
    <Segment attached loading={false}>
      <Header icon='calendar' content='Events' />
      <Tab panes={panes} menu={{ secondary: true, pointing: true }} />
      <br />

      <Card.Group itemsPerRow={5}>
        <Card as={Link} to={`/activities/1`}>
          <Image
            src={`/assets/categoryImages/drinks.jpg`}
            style={{ height: 100 }}
          />
          <Card.Content>
            <Card.Header textAlign='center'>Title</Card.Header>
            <Card.Meta textAlign='center'>
              <div>{format(new Date(), 'Do LLL')}</div>
              <div>{format(new Date(), 'h:mm a')}</div>
            </Card.Meta>
          </Card.Content>
        </Card>
      </Card.Group>
    </Segment>
  </Grid.Column>
);
