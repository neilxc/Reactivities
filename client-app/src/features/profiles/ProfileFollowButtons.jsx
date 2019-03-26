import React, {Fragment} from 'react';
import {Button} from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';

export default inject('profileStore')(observer(({profile, profileStore: {followUser, unfollowUser}}) => (
  <Fragment>
    {!profile.following ? (
      <Button
        size='mini'
        floated='right'
        basic
        color='teal'
        content={'Follow'}
      />
    ) : (
      <Button
        size='mini'
        floated='right'
        basic
        color='red'
        content={'Unfollow'}
      />
    )}
  </Fragment>
)));
