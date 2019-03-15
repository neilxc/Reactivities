import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SettingsNav from './SettingsNav';
import SettingsProfile from './SettingsProfile';
import SettingsPhotos from './SettingsPhotos';
import SettingsAccount from './SettingsAccount';
import { inject, observer } from 'mobx-react';
import LoadingComponent from '../../app/layout/LoadingComponent';

@inject('profileStore', 'authStore')
@observer
class SettingsPage extends Component {
  componentWillMount() {
    const {
      profileStore: { loadProfile },
      authStore: { user }
    } = this.props;
    loadProfile(user.username, { acceptCached: true });
  }

  componentWillUnmount() {
    this.props.profileStore.clearImages();
  }

  render() {
    const {
      profileStore: {
        loading,
        loadingPhoto,
        profile,
        setMainPhoto,
        clickedButton,
        deletePhoto
      }
    } = this.props;
    if (loading) return <LoadingComponent content={'Loading profile...'} />;
    return (
      <Grid>
        <Grid.Column width={12}>
          <Switch>
            <Redirect exact from='/settings' to='/settings/profile' />
            <Route
              path='/settings/profile'
              render={() => <SettingsProfile profile={profile} />}
            />
            <Route
              path='/settings/photos'
              render={() => (
                <SettingsPhotos
                  photos={profile.photos}
                  setMainPhoto={setMainPhoto}
                  deletePhoto={deletePhoto}
                  loading={loadingPhoto}
                  clickedButton={clickedButton}
                />
              )}
            />
            <Route path='/settings/account' component={SettingsAccount} />
          </Switch>
        </Grid.Column>
        <Grid.Column width={4}>
          <SettingsNav />
        </Grid.Column>
      </Grid>
    );
  }
}

export default SettingsPage;
