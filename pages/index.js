import React from 'react';

import { validateFormData } from 'utils/validations';
import cosmic from 'utils/cosmic';
import md5 from 'utils/encryption';
import config from 'config';
import {
  submitFormData
} from 'utils/helperFuncs';

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
		this.props.onLoginUser(userData);
  }

	componentWillReceiveProps(newProps) {
		
    const params = {
      write_key: config.bucket.write_key,
      type_slug: config.users_type,
      title: data.name,
      metafields: [{
        value: data.email,
        key: "email",
        title: "Email",
      }, {
        value: md5.hash(data.password),
        key: "password",
        title: "Password",
      }],
    };
    cosmic("ADD", params)
      .then((res) => {
        console.log("RES:", res)
      })
      .catch(e => console.log(e));
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
