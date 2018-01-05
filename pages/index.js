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

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
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
      this.setState({ error: false });
      const requestBody = { data };
      const requestURL = '/api/signin';
      const options = createRequestOptions('POST', requestBody);
      const response = await request(requestURL, options);
      if(!response.err) {
        const user = response.data;
        cookies.save("token", user.token);
        Router.push('/profile');
      } else {
        this.setState({ error: response.err.reason });
      }
	}

  
	render() {
    const { formDetails, error } = this.state;
		return (
        <Login 
          formDetails={formDetails}
          error={error}

          validateForm={this.validateForm}
          updateFormDetails={this.updateFormDetails}
          submitForm={this.submitForm}
        />
		);
	}
}

export default LoginPage;
