import React from 'react';
import Router from 'next/router';

import { validateFormData } from 'utils/validations';
import request from 'utils/request';
import config from 'config';
import {
  createRequestOptions,
  submitFormData
} from 'utils/helperFuncs';
import cookies from 'utils/cookies';
import Login from 'components/views/Auth/Login';
import Head from 'next/head';
import Meta from 'components/widgets/Meta';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
      formDetails: {
        email: {
          status: true,
          errorText: '',
          value: '',
          rules: ['isRequired', 'isEmail'],
        },
        password: {
          status: true,
          errorText: '',
          value: '',
          rules: ['isRequired'],
        },
      },
    }
  }

  updateFormDetails = (formDetails) => {
    this.setState({ formDetails });
  }

  validateForm = (formData) => {
    return validateFormData(formData);
  }

  submitForm = (formDetails) => { // eslint-disable-line no-unused-vars
    const userData = submitFormData(formDetails);
		this.onLoginUser(userData);
  }

	onLoginUser = async (data) => {
      this.setState({ error: false, loading: true });
      const requestBody = { data };
      const requestURL = '/api/signin';
      const options = createRequestOptions('POST', requestBody);
      const response = await request(requestURL, options);
      if(!response.err) {
        this.setState({ loading: false });
        const user = response.data;
        cookies.save("token", user.token);
        Router.push('/profile');
      } else {
        this.setState({ error: response.err.reason, loading: false });
      }
	}

  componentWillMount() {
    const token = cookies.load('token');
    if(!!token) Router.push('/profile');
  }
  
	render() {
    const { formDetails, error, loading } = this.state;
		return (
      <Meta>
        <Head>
          <title>Sign In ~ Cosmic JS React Auth App</title>
        </Head>
        <Login 
          formDetails={formDetails}
          error={error}
          loading={loading}

          validateForm={this.validateForm}
          updateFormDetails={this.updateFormDetails}
          submitForm={this.submitForm}
        />
      </Meta>
		);
	}
}

export default LoginPage;
