import React from 'react';
import Router from 'next/router';

import { validateFormData } from 'utils/validations';
import {
  createRequestOptions,
  submitFormData
} from 'utils/helperFuncs';
import request from 'utils/request';

import ResetPassword from 'components/views/Auth/ResetPassword';

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
          rules: ['isRequired'],
        },
        confirmPassword: {
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
		this.onResetPassword(userData);
  }

	componentWillReceiveProps(newProps) {
		// const { loginUserStatus } = newProps;
		// if (loginUserStatus.get('loggedIn')) {
		// 	this.props.onReplaceRoute("/")
		// }
  }
  
  onResetPassword = async (data) => {
    this.setState({ error: false, loading: true });
    const requestBody = { data };
    const requestURL = '/api/reset-password';
    const options = createRequestOptions('POST', requestBody);
    const response = await request(requestURL, options);
    if(!response.err) {
      const user = response.data;
      this.setState({  loading: false })
      Router.push("/");
    } else {
      this.setState({ error: response.err.reason, loading: false });
    }
}

	render() {
    const { formDetails, loading } = this.state;
		const error = false;
		return (
        <ResetPassword 
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

export default ResetPasswordPage;
