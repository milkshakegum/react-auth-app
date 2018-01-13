import React from 'react';
import request from 'utils/request';
import Dashboard from 'components/views/Dashboard';
import EditPassword from 'components/views/Profile/Password';
import { validateFormData } from 'utils/validations';
import Router from 'next/router';
import 'isomorphic-fetch';
import {
    createRequestOptions,
    submitFormData
  } from 'utils/helperFuncs';
import cookies from 'utils/cookies';
import Head from 'next/head';
import Meta from 'components/widgets/Meta';



class EditPasswordPage extends React.Component {

    static async getInitialProps({ req }) {
        
        const isServer = typeof window === 'undefined';
        return { isServer };
    }


    constructor(props) {
        super(props);
        this.state = {
            error: false,
            success: false,
            loading: false,
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
        this.setState({ error: false, success: false, loading: true });
        const requestBody = { data };
        const requestURL = '/api/profile/password';
        const token = cookies.load('token');
        const options = createRequestOptions('PUT', requestBody, { Authorization: `Bearer ${token}` });
        const response = await request(requestURL, options);
        if(!response.err) {
            const user = response.data;
            this.setState({ success: "Your password is edited successfully!", loading: false });
        } else {
            this.setState({ error: response.err.reason, loading: false });
        }
    }
    

    async componentWillMount() {
        const token = cookies.load('token');
        if(!token) Router.push('/');
    }
	render() {
        const { formDetails, error, success, loading } = this.state;
        return (
            <Meta>
                <Head>
                    <title>Edit Password ~ Cosmic.js React Auth App</title>
                </Head>
                <Dashboard>
                    <EditPassword            
                        formDetails={formDetails}
                        error={error}
                        success={success}
                        loading={loading}

                        validateForm={this.validateForm}
                        updateFormDetails={this.updateFormDetails}
                        submitForm={this.submitForm}
                    />
                </Dashboard>
            </Meta>
		);
	}
}

export default EditPasswordPage;
