import React, { Fragment } from 'react';
import {Menu, Header} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

export default props => (
  <Fragment>
    <Menu vertical>
      <Header
        icon={'user'}
        attached
        inverted
        color={'grey'}
        content={'Profile'}
      />
      <Menu.Item as={NavLink} to={'/settings/profile'}>
        My Profile
      </Menu.Item>
      <Menu.Item as={NavLink} to={'/settings/photos'}>
        My Photos
      </Menu.Item>
    </Menu>
    <Menu vertical>
      <Header
        icon={'settings'}
        attached
        inverted
        color={'grey'}
        content={'Account'}
      />
      <Menu.Item as={NavLink} to={'/settings/account'}>
        My Account
      </Menu.Item>
    </Menu>
  </Fragment>
);
