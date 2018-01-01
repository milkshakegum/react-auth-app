import React from 'react';

import Dashboard from 'components/views/Dashboard';
import Profile from 'components/views/Profile';
import 'isomorphic-fetch';
import cookies from 'utils/cookies';
import {
    createRequestOptions
  } from 'utils/helperFuncs';

class ProfilePage extends React.Component {

    static async getInitialProps({ req }) {
        const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
        const token = req.cookies.token;
        const requestURL = `${baseUrl}/api/profile`;
        const options = createRequestOptions('GET', null, { Authorization: `Bearer ${token}` });
        const requestObject = await fetch(requestURL, options);
        const user = await requestObject.json();

        return { user };
    }
	render() {
        return (
            <Dashboard>
                <Profile 
                    user={this.props.user}
                />
            </Dashboard>
		);
	}
}

export default ProfilePage;
