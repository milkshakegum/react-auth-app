/**
*
* Profile
*
*/

import React from 'react';
import Link from 'next/link';
import { Grid, Icon, Header, Message } from 'semantic-ui-react';


class Profile extends React.Component { // eslint-disable-line react/prefer-stateless-function



  render() {
    const { formDetails, error } = this.props;
    return (
      <div>
        <Grid
          textAlign='center'
          style={{ height: '100%', }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450, marginTop: "13vh" }}>
            <Header as='h2' color='teal' textAlign='left'>
              <Icon name="user" />
              {' '}Muhammad Musa
            </Header>
            <Header as='h2' color='teal' textAlign='left'>
              <Icon name="mail" />
              {' '}musaghauri@hotmail.com
            </Header>
            
            <Message>
              Do you want to edit your profile? <Link href="/profile/edit">Edit</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Profile.propTypes = {

};

export default Profile;
