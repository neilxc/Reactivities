import React from "react";
import { Menu, Button, Container } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom'

const Header = props => (
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
    </Container>
  </Menu>
);

export default Header;
