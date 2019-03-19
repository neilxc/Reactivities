import React from 'react'
import { Tab } from 'semantic-ui-react'
import ProfilePhotos from './photos/ProfilePhotos';
import ProfileEvents from './ProfileEvents';
import ProfileDescription from './ProfileAbout';

const panes = [
  { menuItem: 'About', render: () => <ProfileDescription /> },
  { menuItem: 'Photos', render: () => <ProfilePhotos /> },
  { menuItem: 'Events', render: () => <ProfileEvents /> },
  { menuItem: 'Followers', render: () => <Tab.Pane>Followers will go here</Tab.Pane> },
  { menuItem: 'Following', render: () => <Tab.Pane>Following will go here</Tab.Pane> },
]

const ProfileContent = () => (
  <Tab menu={{ fluid: true, vertical: true }} menuPosition='right' panes={panes} />
)

export default ProfileContent