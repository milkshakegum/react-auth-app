/**
*
* Dashboard
*
*/

import React from 'react';

import Header from './Header';
import { Container } from 'semantic-ui-react';

// import cookie from 'utils/cookie';

class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="skin-blue fixed sidebar-open">
        <div>
          <Header />

          <Container text style={{ marginTop: '7em' }}>
            {React.Children.toArray(this.props.children)}
          </Container>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {

};

export default Dashboard;
