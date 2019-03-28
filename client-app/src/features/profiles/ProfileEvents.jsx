import React, { Component } from 'react';
import { Header, Tab, Card, Image, TabPane } from 'semantic-ui-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const panes = [
  { menuItem: 'Future Events', pane: { key: 'futureEvents' } },
  { menuItem: 'Past Events', pane: { key: 'pastEvents' } },
  { menuItem: 'Hosting', pane: { key: 'hosted' } }
];

@inject('profileStore')
@observer
class ProfileActivities extends Component {
  componentDidMount() {
    this.props.profileStore.setUserActivityTab(
      null,
      { activeIndex: 0 },
      this.props.profileStore.profile.username
    );
  }

  render() {
    const {
      profileStore: {
        setUserActivityTab,
        userActivities,
        profile,
        loadingActivities
      }
    } = this.props;
    return (
      <TabPane loading={loadingActivities}>
        <Header icon='calendar' content='Events' />
        <Tab
          panes={panes}
          menu={{ secondary: true, pointing: true }}
          onTabChange={(e, data) =>
            setUserActivityTab(e, data, profile.username)
          }
        />
        <br />

        <Card.Group itemsPerRow={4} stackable>
          {userActivities.map(activity => (
            <Card as={Link} to={`/activity/${activity.id}`} key={activity.id}>
              <Image
                src={`/assets/categoryImages/${activity.category}.jpg`}
                style={{ minHeight: 100, objectFit: 'cover' }}
              />
              <Card.Content>
                <Card.Header textAlign='center'>{activity.title}</Card.Header>
                <Card.Meta textAlign='center'>
                  <div>{format(activity.date, 'do LLL')}</div>
                  <div>{format(activity.date, 'h:mm a')}</div>
                </Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </TabPane>
    );
  }
}

export default ProfileActivities;
