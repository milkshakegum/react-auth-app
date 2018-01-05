/**
*
* Header
*
*/

import React from 'react';
import Router from 'next/router';
import cookie from 'utils/cookies';

import { Container, Divider, Dropdown, Image, Menu } from 'semantic-ui-react';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  logout = () => {
    cookie.remove('token');
    Router.push("/")
  }
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
          <Menu.Item onClick={this.logout} key="log_out" position="right">
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
