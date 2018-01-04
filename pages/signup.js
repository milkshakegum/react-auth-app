import React from 'react';
import request from 'utils/request';
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

	componentWillReceiveProps(newProps) {
		// const { loginUserStatus } = newProps;
		// if (loginUserStatus.get('loggedIn')) {
		// 	this.props.onReplaceRoute("/")
		// }
	}

  onSignup = async (data) => {
    this.setState({ error: false });
    const requestBody = { data };
    const requestURL = 'api/signup';
    const options = createRequestOptions('POST', requestBody);
    const response = await request(requestURL, options);
    if(!response.err) {
      const user = response.data;
      cookies.save("token", user.token);
    } else {
      this.setState({ error: response.err.reason });
    }
  }

	render() {
    const { formDetails, error } = this.state;
		return (
        <SignUp 
          formDetails={formDetails}
          error={error}

          validateForm={this.validateForm}
          updateFormDetails={this.updateFormDetails}
          submitForm={this.submitForm}
        />
		);
	}
}

export default SignUpPage;
