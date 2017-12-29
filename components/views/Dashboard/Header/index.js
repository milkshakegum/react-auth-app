/**
*
* Header
*
*/

import React from 'react';

import { Container, Divider, Dropdown, Image, Menu } from 'semantic-ui-react';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item  as='a' header>
            <Image
              size='mini'
              src='/static/images/logo.png'
              style={{ marginRight: '1.5em' }}
            />
            Muhammad Musa
          </Menu.Item>
          <Menu.Item onClick={()=>console.log("AA")} key="log_out" position="right">
            Logout
          </Menu.Item>
        </Container>
      </Menu>

    );
  }
}

Header.propTypes = {

};

export default Header;
