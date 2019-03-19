import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import LoadingComponent from '../../app/layout/LoadingComponent';
import ProfileContent from './ProfileContent';

@inject('profileStore')
@observer
class Profile extends Component {
  async componentWillMount() {
    const username = this.props.match.params.username;
    await this.props.profileStore.loadProfile(username);
  }

  render() {
    const {
      profileStore: { profile, loadingProfile }
    } = this.props;
    if (loadingProfile) return <LoadingComponent content={'Loading profile...'} />;
    return (
      <Grid stackable>
        <Grid.Column width={16}>
          <ProfileHeader profile={profile} />
          <ProfileContent />
        </Grid.Column>
      </Grid>
    );
  }
}
export default Profile;
