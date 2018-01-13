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
          <Menu.Item onClick={()=>Router.replace("/profile")}  as='a' header>
            <Image
              size='mini'
              src='/static/images/logo.svg'
              style={{ marginRight: '1.5em' }}
            />
            React Auth App
          </Menu.Item>
          <Menu.Item position="right">
            <Menu.Item onClick={()=>Router.replace("/profile/edit/password")} key="change_password" >
              Change Password
            </Menu.Item>  
            <Menu.Item onClick={this.logout} key="log_out">
              Logout
            </Menu.Item>
          </Menu.Item>
        </Container>
      </Menu>

    );
  }
}

Header.propTypes = {

};

export default Header;
