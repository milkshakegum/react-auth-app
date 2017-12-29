import React from 'react';

import { validateFormData } from 'utils/validations';

import Login from 'components/views/Auth/Login';
// console.log(validateFormData)
class Home extends React.Component {

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
		// const { loginUserStatus } = newProps;
		// if (loginUserStatus.get('loggedIn')) {
		// 	this.props.onReplaceRoute("/")
		// }
	}

	render() {
    const { formDetails } = this.state;
		const error = false;
		return (
        <Login 
          formDetails={formDetails}
          error={error}
        />
		);
	}
}

export default Home;
