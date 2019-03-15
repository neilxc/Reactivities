import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileDescription from './ProfileDescription';
import ProfileSidebar from './ProfileSidebar';
import ProfilePhotos from './ProfilePhotos';
import ProfileEvents from './ProfileEvents';
import { panes } from '../../app/common/form/data/panes';
import LoadingComponent from '../../app/layout/LoadingComponent';

@inject('profileStore')
@observer
class Profile extends Component {
  async componentWillMount() {
    const username = this.props.match.params.username;
    await this.props.profileStore.loadProfile(username);
  }

  render() {
    const {profileStore: {profile, loading}} = this.props; 
    if (loading) return <LoadingComponent content={'Loading profile...'}/>
    return (
      <Grid>
      <ProfileHeader profile={profile} />
      <ProfileDescription profile={profile} />
      <ProfileSidebar />
      <ProfilePhotos photos={profile.photos} />
      <ProfileEvents panes={panes} />
    </Grid>
    )
  }
}
export default Profile;
