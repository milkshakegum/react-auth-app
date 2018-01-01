import React from 'react';

import { validateFormData } from 'utils/validations';
import request from 'utils/request';
import config from 'config';
import {
  createRequestOptions,
  submitFormData
} from 'utils/helperFuncs';
import cookies from 'utils/cookies';
import Login from 'components/views/Auth/Login';
// console.log(validateFormData)
class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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

	onLoginUser(data) {
		
    const requestBody = { data };
    const requestURL = 'api/signin';
    const options = createRequestOptions('POST', requestBody);
    request(requestURL, options)
      .then(data => {
        const user = data.data;
        cookies.save("token", user.token);
      })
      .catch(e => console.log("ERR", e))
	}

  
	render() {
    const { formDetails } = this.state;
		const error = false;
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
