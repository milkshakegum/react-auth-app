import React from 'react';
import request from 'utils/request';
import Dashboard from 'components/views/Dashboard';
import EditProfile from 'components/views/Profile/Edit';
import { validateFormData } from 'utils/validations';
import 'isomorphic-fetch';
import {
    createRequestOptions,
    submitFormData
  } from 'utils/helperFuncs';
  import cookies from 'utils/cookies';
  import Router from 'next/router';



class EditProfilePage extends React.Component {

    static async getInitialProps({ req }) {
        
        const isServer = typeof window === 'undefined';
        if(isServer) {
            const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
            const token = req.cookies.token;
            const requestURL = `${baseUrl}/api/profile`;
            const options = createRequestOptions('GET', null, { Authorization: `Bearer ${token}` });
            const requestObject = await fetch(requestURL, options);
            const user = await requestObject.json();
            return { user, isServer };
        } else {
            return { isServer };
        }
    }

    async componentWillMount() {
        const token = cookies.load('token');
        if(!token) Router.push("/");
        else if(!this.props.isServer){
            const { state } = this;
            const token = cookies.load('token');
            const requestURL = `/api/profile`;
            const options = createRequestOptions('GET', null, { Authorization: `Bearer ${token}` });
            const requestObject = await fetch(requestURL, options);
            const user = await requestObject.json();
            this.setState({ ...state, formDetails: { name: { value: user.title }} });
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            loading: false,
            formDetails: {
                name: {
                    status: false,
                    errorText: '',
                    value: !!this.props.user? this.props.user.title:"",
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
        this.onEditUser(userData);
      }
    
      onEditUser = (data) => {
        const token = cookies.load('token');
        this.setState({ success: false, loading: true });
        const requestBody = { data };
        const requestURL = '/api/profile';
        const options = createRequestOptions('PUT', requestBody, { Authorization: `Bearer ${token}` });
        request(requestURL, options)
          .then(data => {
            const user = data.data;
            cookies.save("token", user.token);
            this.setState({ success: "Your profile has been edited successfully!", loading: false });
          })
          .catch(e => this.setState({ loading: false }));
      }
    
	render() {
        const { formDetails, success, loading } = this.state;
        return (
            <Dashboard>
                <EditProfile            
                    formDetails={formDetails}
                    success={success}
                    loading={loading}

                    validateForm={this.validateForm}
                    updateFormDetails={this.updateFormDetails}
                    submitForm={this.submitForm}
                />
            </Dashboard>
		);
	}
}

export default EditProfilePage;
