import React from 'react';

import Dashboard from 'components/views/Dashboard';
import EditProfile from 'components/views/Profile/Edit';
import { validateFormData } from 'utils/validations';



class EditProfilePage extends React.Component {

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
            <Dashboard>
                <EditProfile            
                    formDetails={formDetails}
                    error={error}

                    validateForm={this.validateForm}
                    updateFormDetails={this.updateFormDetails}
                    submitForm={this.submitForm}
                />
            </Dashboard>
		);
	}
}

export default EditProfilePage;
