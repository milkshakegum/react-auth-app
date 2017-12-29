import React from 'react';

import { validateFormData } from 'utils/validations';

import ResetPassword from 'components/views/Auth/ResetPassword';
// console.log(validateFormData)
class ResetPasswordPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formDetails: {
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
        <ResetPassword 
          formDetails={formDetails}
          error={error}

          validateForm={this.validateForm}
          updateFormDetails={this.updateFormDetails}
          submitForm={this.submitForm}
        />
		);
	}
}

export default ResetPasswordPage;
