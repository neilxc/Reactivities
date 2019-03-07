import React from "react";
import { Menu, Button, Container } from "semantic-ui-react";

const Header = props => (
  <Menu fixed='top' inverted>
    <Container>
      <Menu.Item header>
        <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
        Reactivities
      </Menu.Item>
      <Menu.Item name="Activities" />
      <Menu.Item>
        <Button positive content="Create Activity" />
      </Menu.Item>
    </Container>
  </Menu>
);

export default Header;
