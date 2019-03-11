import React from "react";
import { Menu, Button, Container, Image, Dropdown } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom'
import {inject, observer} from 'mobx-react';

const Header = ({homeStore: {user, logout, isLoggedIn}}) => (
  <Menu fixed='top' inverted>
    <Container>
      <Menu.Item header as={NavLink} activeClassName='active' exact to='/'>
        <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
        Reactivities
      </Menu.Item>
      <Menu.Item as={NavLink} to='/activities' name="Activities" />
      <Menu.Item  name='Create Activity' >
        <Button as={Link} to='/createActivity' className='navbutton' color='green' content="Create Activity" />
      </Menu.Item>
      {isLoggedIn &&
      <Menu.Item position='right'>
        <Image avatar spaced='right' src={user.image || '/assets/user.png'}/>
        <Dropdown pointing='top left' text={user.firstName}>
          <Dropdown.Menu>
            <Dropdown.Item text="Sign out" onClick={logout}/>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>}
    </Container>
  </Menu>
);

export default inject('homeStore')(observer(Header));
