import React from 'react';

import { validateFormData } from 'utils/validations';

import ForgotPassword from 'components/views/Auth/ForgotPassword';
// console.log(validateFormData)
class ForgotPasswordPage extends React.Component {

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
		// const { loginUserStatus } = newProps;
		// if (loginUserStatus.get('loggedIn')) {
		// 	this.props.onReplaceRoute("/")
		// }
	}

	render() {
    const { formDetails } = this.state;
		const error = false;
		return (
        <ForgotPassword 
          formDetails={formDetails}
          error={error}

          validateForm={this.validateForm}
          updateFormDetails={this.updateFormDetails}
          submitForm={this.submitForm}
        />
		);
	}
}

export default ForgotPasswordPage;
