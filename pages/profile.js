import React from 'react';

import Dashboard from 'components/views/Dashboard';
import Profile from 'components/views/Profile';
import 'isomorphic-fetch';
import {
    createRequestOptions
  } from 'utils/helperFuncs';
import cookies from 'utils/cookies';
import Router from 'next/router';
import Head from 'next/head';
import Meta from 'components/widgets/Meta';
class ProfilePage extends React.Component {

    static async getInitialProps({ req }) {
        
        const isServer = typeof window === 'undefined';
        if(isServer) {
            const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
            const token = req.cookies.token;
            const requestURL = `${baseUrl}/api/profile`;
            const options = createRequestOptions('GET', null, { Authorization: `Bearer ${token}` });
            const requestObject = await fetch(requestURL, options);
            const user = await requestObject.json();

            return { user, isServer };
        } else {
            return { isServer }
        }
    }
    constructor(props){
        super(props);
        this.state = {
            user: props.user,
            loading: false,
        }
    }
    async componentWillMount() {
        const token = cookies.load('token');
        if(!token) Router.push("/");
        else if (!this.props.isServer){
            this.setState({ loading: true });
            const token = cookies.load('token');
            const requestURL = `/api/profile`;
            const options = createRequestOptions('GET', null, { Authorization: `Bearer ${token}` });
            const requestObject = await fetch(requestURL, options);
            const user = await requestObject.json();
            this.setState({ user, loading: false });
        }
    }
	render() {
        if(!this.state.user) return null;
        return (
            <Meta>
                <Head>
                    <title>{!!this.state.user ? this.state.user.title:''} ~ Cosmic JS React Auth App</title>
                </Head>
                <Dashboard>
                    <Profile 
                        user={this.state.user}
                        loading={this.state.loading}
                    />
                </Dashboard>
            </Meta>
		);
	}
}

export default ProfilePage;
