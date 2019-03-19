import React from 'react';
import { Header, Button, TabPane } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import ProfileEditForm from './ProfileEditForm';
import TabHeader from './tabs/TabHeader';
import TabContent from './tabs/TabContent';

export default inject('profileStore')(
  observer(
    ({
      profileStore: {
        profile,
        toggleEditProfileMode,
        editProfileMode,
        isCurrentUser
      }
    }) => (
      <TabPane>
        <TabHeader>
          <Header
            floated='left'
            icon='user'
            content={`About ${profile.displayName}`}
          />
          {!editProfileMode && isCurrentUser && (
            <Button
              floated='right'
              content={'Edit'}
              basic
              onClick={toggleEditProfileMode}
            />
          )}
        </TabHeader>
        <TabContent>
          {editProfileMode ? <ProfileEditForm /> : <span>{profile.bio}</span>}
        </TabContent>
      </TabPane>
    )
  )
);
