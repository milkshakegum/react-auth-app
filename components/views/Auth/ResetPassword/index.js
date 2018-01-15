/**
*
* ResetPassword
*
*/

import React from 'react';
import Link from 'next/link';
import { Form, Grid, Header, Dimmer, Loader, Image, Message, Segment } from 'semantic-ui-react';

import TextField from 'components/widgets/Form/TextField';
import SubmitButton from 'components/widgets/Form/SubmitButton';
import Colors from 'components/styles/colors';

class ResetPassword extends React.Component { // eslint-disable-line react/prefer-stateless-function

  handleChange = (name, value) => {
    const tempFormDetails = Object.assign({}, this.props.formDetails);
    tempFormDetails[name].value = value;
    this.props.updateFormDetails(tempFormDetails);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { formDetails } = this.props;
    const result = this.props.validateForm(formDetails);
    this.props.updateFormDetails(result.updatedFormData);
    if (result.validateFlag) this.props.submitForm(formDetails);
  }


  render() {
    const { formDetails, error, loading } = this.props;
    return (
      <div>
        <Dimmer active={loading}>
          <Loader size='massive'>Resetting Password</Loader>
        </Dimmer>
        <Grid
          textAlign='center'
          style={{ height: '100%', }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450, marginTop: "13vh" }}>
            <Header as='h2' style={{ color: Colors.primary }} textAlign='center'>
              <Image src='static/images/logo.svg' />
              {' '}Reset Password
            </Header>
            <Form size='large'>
              <Segment stacked>
                {
                  !!error && <Message negative>
                    <p>{error}</p>
                  </Message>
                }

                <TextField
                  icon='lock'
                  name="otp"
                  label='OTP'
                  type='text'
                  value={formDetails.otp.value||""}
                  handleChange={(name, value) => this.handleChange(name, value)}
                  errorText={!formDetails.otp.status ? formDetails.otp.errorText : ''}
                />

                <TextField
                  icon='mail'
                  name="email"
                  label='Email'
                  type='text'
                  value={formDetails.email.value||""}
                  handleChange={(name, value) => this.handleChange(name, value)}
                  errorText={!formDetails.email.status ? formDetails.email.errorText : ''}
                />
                
                <TextField
                  icon='lock'
                  name="password"
                  label='New Password'
                  type='password'
                  value={formDetails.password.value||""}
                  handleChange={(name, value) => this.handleChange(name, value)}
                  errorText={!formDetails.password.status ? formDetails.password.errorText : ''}
                />

                
                <TextField
                  icon='lock'
                  name="confirmPassword"
                  label='Confirm New Password'
                  type='password'
                  value={formDetails.confirmPassword.value||""}
                  handleChange={(name, value) => this.handleChange(name, value)}
                  errorText={!formDetails.confirmPassword.status ? formDetails.confirmPassword.errorText : ''}
                />

                <SubmitButton
                  color={Colors.primary}
                  label="Reset Password"
                  onSubmit={this.handleSubmit}
                />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

ResetPassword.propTypes = {

};

export default ResetPassword;
