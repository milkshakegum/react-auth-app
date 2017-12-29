import React from 'react';

import Dashboard from 'components/views/Dashboard';
import Profile from 'components/views/Profile';



class ProfilePage extends React.Component {

	render() {
        return (
            <Dashboard>
                <Profile />
            </Dashboard>
		);
	}
}

export default ProfilePage;
