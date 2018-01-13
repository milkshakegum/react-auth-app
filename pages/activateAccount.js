import React from 'react';
import Router from 'next/router';

import request from 'utils/request';
import config from 'config';
import {
  createRequestOptions,
} from 'utils/helperFuncs';
import cookies from 'utils/cookies';
import Head from 'next/head';
import Meta from 'components/widgets/Meta';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,

    }
  }
    static async getInitialProps({ req, query }) {

        return { query };
    }


  async componentWillMount() {
    const { query } = this.props;
    this.setState({ error: false, loading: true });
    const requestURL = `/api/activate-account?token=${query.token}&email=${query.email}`;
    const response = await request(requestURL);
    if(!response.err) {
        this.setState({ loading: false });
        Router.push('/');
    } else {
        this.setState({ error: response.err.reason, loading: false });
    }
  }
  
	render() {
    const { formDetails, error, loading } = this.state;
		return (
      <Meta>  
        <Head>
          <title>Activate Account ~ Cosmic.js React Auth App</title>
        </Head>
      </Meta>
		);
	}
}

export default LoginPage;
