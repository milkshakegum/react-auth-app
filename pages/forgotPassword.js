import React from 'react';
import Router from 'next/router';

import { validateFormData } from 'utils/validations';

import {
  createRequestOptions,
  submitFormData
} from 'utils/helperFuncs';
import request from 'utils/request';
import cookies from 'utils/cookies';
import Head from 'next/head';
import Meta from 'components/widgets/Meta';

import ForgotPassword from 'components/views/Auth/ForgotPassword';

class ForgotPasswordPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      success: false,
      loading: false,
      formDetails: {
        email: {
          status: true,
          errorText: '',
          value: '',
          rules: ['isRequired', 'isEmail'],
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
		this.onForgotPassword(userData);
  }

  componentWillMount() {
    const token = cookies.load('token');
    if(!!token) Router.push('/profile');
  }

  onForgotPassword = async (data) => {
      this.setState({ error: false, success: false, loading: true });
      const requestBody = { data };
      const requestURL = '/api/forgot-password';
      const options = createRequestOptions('POST', requestBody);
      const response = await request(requestURL, options);
      if(!response.err) {
        const user = response.data;
        this.setState({ success: true, loading: false });
      } else {
        this.setState({ error: response.err.reason, loading: false });
      }
  }

	render() {
    const { formDetails, error, success, loading } = this.state;
		return (
      <Meta>
        <Head>
          <title>Forgot Password ~ Cosmic JS React Auth App</title>
        </Head>
        <ForgotPassword 
          formDetails={formDetails}
          error={error}
          success={success}
          loading={loading}

          validateForm={this.validateForm}
          updateFormDetails={this.updateFormDetails}
          submitForm={this.submitForm}
        />
      </Meta>
		);
	}
}

export default ForgotPasswordPage;
