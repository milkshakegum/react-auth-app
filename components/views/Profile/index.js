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
    const { user } = this.props;
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
              {' '}{user.title||""}
            </Header>
            <Header as='h2' color='teal' textAlign='left'>
              <Icon name="mail" />
              {' '}{user.metadata.email}
            </Header>
            
            <Message>
              Do you want to edit your profile? <Link href="/profile/edit"><a>Edit</a></Link>
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
