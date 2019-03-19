import React from 'react';
import { Header, Tab, Card, Image, TabPane } from 'semantic-ui-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const panes = [
  { menuItem: 'All Events', pane: { key: 'allEvents' } },
  { menuItem: 'Past Events', pane: { key: 'pastEvents' } },
  { menuItem: 'Future Events', pane: { key: 'futureEvents' } },
  { menuItem: 'Hosting', pane: { key: 'hosted' } }
];

export default () => (
  <TabPane>
    <Header icon='calendar' content='Events' />
    <Tab panes={panes} menu={{ secondary: true, pointing: true }} />
    <br />

    <Card.Group itemsPerRow={4} stackable>
      <Card as={Link} to={`/activities/1`}>
        <Image
          src={`/assets/categoryImages/drinks.jpg`}
          style={{ minHeight: 100, objectFit: 'cover' }}
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
  </TabPane>
);
