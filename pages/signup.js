import React from 'react';
import request from 'utils/request';
import Router from 'next/router';
import { validateFormData } from 'utils/validations';
import config from 'config';
import SignUp from 'components/views/Auth/SignUp';

import {
  createRequestOptions,
  submitFormData
} from 'utils/helperFuncs';
import cookies from 'utils/cookies';

class SignUpPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
      formDetails: {
        name: {
            status: true,
            errorText: '',
            value: '',
            rules: ['isRequired'],
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
		this.onSignup(userData);
  }


  onSignup = async (data) => {
    this.setState({ error: false, loading: true });
    const requestBody = { data };
    const requestURL = 'api/signup';
    const options = createRequestOptions('POST', requestBody);
    const response = await request(requestURL, options);
    if(!response.err) {
      this.setState({  loading: true });
      const user = response.data;
      cookies.save("token", user.token);
      Router.push("/");
    } else {
      this.setState({ error: response.err.reason, loading: false });
    }
  }

	render() {
    const { formDetails, error, loading } = this.state;
		return (
        <SignUp 
          formDetails={formDetails}
          error={error}
          loading={loading}

          validateForm={this.validateForm}
          updateFormDetails={this.updateFormDetails}
          submitForm={this.submitForm}
        />
		);
	}
}

export default SignUpPage;
