import React, {Component} from 'react';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from './photos/ProfilePhotos';
import ProfileEvents from './ProfileEvents';
import ProfileDescription from './ProfileAbout';
import ProfileFollowings from './ProfileFollowings';
import { inject, observer } from 'mobx-react';

const panes = [
  { menuItem: 'About', render: () => <ProfileDescription /> },
  { menuItem: 'Photos', render: () => <ProfilePhotos /> },
  { menuItem: 'Events', render: () => <ProfileEvents /> },
  { menuItem: 'Followers', render: () => <ProfileFollowings /> },
  { menuItem: 'Following', render: () => <ProfileFollowings /> }
];

@inject('profileStore')
@observer
class ProfileContent extends Component {
  render() {
    const {setActiveTab} = this.props.profileStore;
    return (
      <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
      onTabChange={(e, data) => setActiveTab(e, data)}
    />
    )
  }
}

export default ProfileContent;
