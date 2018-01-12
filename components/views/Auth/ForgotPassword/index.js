/**
*
* ForgotPassword
*
*/

import React from 'react';
import Link from 'next/link';
import { Form, Grid, Dimmer, Loader, Header, Image, Message, Segment } from 'semantic-ui-react';

import TextField from 'components/widgets/Form/TextField';
import SubmitButton from 'components/widgets/Form/SubmitButton';

class ForgotPassword extends React.Component { // eslint-disable-line react/prefer-stateless-function

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
    const { formDetails, error, success, loading } = this.props;
    
    return (
      <div>
        <Dimmer active={loading}>
          <Loader size='massive'>Sending Email...</Loader>
        </Dimmer>
        <Grid
          textAlign='center'
          style={{ height: '100%', }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450, marginTop: "13vh" }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='static/images/logo.svg' />
              {' '}Forgot Password?
            </Header>
            <Form size='large'>
              <Segment stacked>
                {
                  !!error && <Message negative>
                    <p>{error}</p>
                  </Message>
                }
                {
                  !!success && <Message color='green'>
                    <p>OTP has been sent to {formDetails.email.value}</p> <Link href="/resetPassword"><a>Reset Password</a></Link>
                  </Message>
                }
                <TextField
                  icon="mail"
                  label="Email"
                  name="email"
                  value={formDetails.email.value||""}
                  handleChange={this.handleChange}
                  errorText={!formDetails.email.status ? formDetails.email.errorText : ''}
                />

                <SubmitButton
                  color="teal"
                  label="Forgot Password"
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

ForgotPassword.propTypes = {

};

export default ForgotPassword;
