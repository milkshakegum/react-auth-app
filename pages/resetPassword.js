import React from 'react';
import Router from 'next/router';
import cookies from 'utils/cookies';

import { validateFormData } from 'utils/validations';
import {
  createRequestOptions,
  submitFormData
} from 'utils/helperFuncs';
import request from 'utils/request';
import Head from 'next/head';
import ResetPassword from 'components/views/Auth/ResetPassword';
import Meta from 'components/widgets/Meta';

class ResetPasswordPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      formDetails: {
        otp: {
          status: true,
          errorText: '',
          value: '',
          rules: ['isRequired', 'isNumber', 'isPositive'],
        },
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
          rules: ['isRequired', 'PasswordLimitations'],
        },
        confirmPassword: {
          status: true,
          errorText: '',
          value: '',
          rules: ['isRequired', 'PasswordLimitations'],
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
		this.onResetPassword(userData);
  }

  componentWillMount() {
    const token = cookies.load('token');
    if(!!token) Router.push('/profile');
  }
  
  onResetPassword = async (data) => {
    this.setState({ error: false, loading: true });
    const requestBody = { data };
    const requestURL = '/api/reset-password';
    const options = createRequestOptions('POST', requestBody);
    const response = await request(requestURL, options);
    if(!response.err) {
      const user = response.data;
      const tempFormDetails = Object.assign({}, this.state.formDetails);
      tempFormDetails.otp.value = '';
      tempFormDetails.email.value = '';
      tempFormDetails.password.value = '';
      tempFormDetails.confirmPassword.value = '';
      this.updateFormDetails(tempFormDetails);
      this.setState({  loading: false, success: true });
      // Router.push("/");
    } else {
      this.setState({ error: response.err.reason, loading: false });
    }
}

	render() {
    const { formDetails, loading, success } = this.state;
		const error = false;
		return (
      <Meta>
        <Head>
          <title>Reset Password ~ Cosmic JS React Auth App</title>
        </Head>
        <ResetPassword 
          formDetails={formDetails}
          error={error}
          loading={loading}
          success={success}

          validateForm={this.validateForm}
          updateFormDetails={this.updateFormDetails}
          submitForm={this.submitForm}
        />
      </Meta>
		);
	}
}

export default ResetPasswordPage;
