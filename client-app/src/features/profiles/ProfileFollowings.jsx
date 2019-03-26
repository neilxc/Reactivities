import React from 'react';
import { observer, inject } from 'mobx-react';
import { TabPane, Header, CardGroup } from 'semantic-ui-react';
import TabHeader from './tabs/TabHeader';
import TabContent from './tabs/TabContent';
import ProfileCard from './ProfileCard';

export default inject('profileStore')(
  observer(({ profileStore: { activeTab, profiles, profile, loadingFollowings } }) => (
    <TabPane loading={loadingFollowings}>
      <TabHeader>
        <Header
          floated='left'
          icon='users'
          content={
            activeTab === 3
              ? `People following ${profile.displayName}`
              : `People ${profile.displayName} is following`
          }
        />
      </TabHeader>
      <TabContent>
        <CardGroup itemsPerRow={4}>
          {profiles &&
            profiles.map(profile => (
              <ProfileCard profile={profile} key={profile.username} />
            ))}
        </CardGroup>
      </TabContent>
    </TabPane>
  ))
);
