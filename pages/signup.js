import React from 'react';
import request from 'utils/request';
import { validateFormData } from 'utils/validations';
import config from 'config';
import SignUp from 'components/views/Auth/SignUp';

import {
  createRequestOptions,
  submitFormData
} from 'utils/helperFuncs';

class SignUpPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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

  onSignup = (data) => {
    const requestBody = { data };
    const requestURL = 'api/signup';
    const options = createRequestOptions('POST', requestBody);
    request(requestURL, options)
      .then(data => {
        console.log("RES", data)
      })
      .catch(e => console.log("ERR", e))
  }

	render() {
    const { formDetails } = this.state;
		const error = false;
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
