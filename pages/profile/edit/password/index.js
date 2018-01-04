import React from 'react';
import request from 'utils/request';
import Dashboard from 'components/views/Dashboard';
import EditPassword from 'components/views/Profile/Password';
import { validateFormData } from 'utils/validations';
import 'isomorphic-fetch';
import {
    createRequestOptions,
    submitFormData
  } from 'utils/helperFuncs';
import cookies from 'utils/cookies';



class EditPasswordPage extends React.Component {

    static async getInitialProps({ req }) {
        
        const isServer = typeof window === 'undefined';
        // if(isServer) {
        //     const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
        //     const token = req.cookies.token;
        //     const requestURL = `${baseUrl}/api/profile`;
        //     const options = createRequestOptions('GET', null, { Authorization: `Bearer ${token}` });
        //     const requestObject = await fetch(requestURL, options);
        //     const user = await requestObject.json();
        //     return { user, isServer };
        // } else {
        //     return { isServer };
        // }

        return { isServer };
    }

    // async componentWillMount() {
    //     if(!this.props.isServer){
    //         const { state } = this;
    //         const token = cookie.load('token');
    //         const requestURL = `/api/profile`;
    //         const options = createRequestOptions('GET', null, { Authorization: `Bearer ${token}` });
    //         const requestObject = await fetch(requestURL, options);
    //         const user = await requestObject.json();
    //         this.setState({ ...state, formDetails: { name: { value: user.title }} });
    //     }
    // }

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            formDetails: {
                old_password: {
                    status: false,
                    errorText: '',
                    value: "",
                    rules: ['isRequired'],
                },
                new_password: {
                    status: false,
                    errorText: '',
                    value: "",
                    rules: ['isRequired'],
                },
                new_password_confirm: {
                    status: false,
                    errorText: '',
                    value: "",
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
        this.onEditPassword(userData);
    }
    
    onEditPassword = async (data) => {
        this.setState({ error: false });
        const requestBody = { data };
        const requestURL = '/api/profile/password';
        const token = cookies.load('token');
        const options = createRequestOptions('PUT', requestBody, { Authorization: `Bearer ${token}` });
        const response = await request(requestURL, options);
        if(!response.err) {
            const user = response.data;
        } else {
            this.setState({ error: response.err.reason });
        }
    }
    
	render() {
        const { formDetails, error } = this.state;
        return (
            <Dashboard>
                <EditPassword            
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

export default EditPasswordPage;
