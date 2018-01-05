/**
*
* Login
*
*/

import React from 'react';
import Link from 'next/link';
import { Form, Dimmer, Loader, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

import TextField from 'components/widgets/Form/TextField';
import SubmitButton from 'components/widgets/Form/SubmitButton';

class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function

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
          <Loader size='massive'>Signing in</Loader>
        </Dimmer>
        <Grid
          textAlign='center'
          style={{ height: '100%', }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450, marginTop: "13vh" }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='static/images/logo.png' />
              {' '}Log in to your account
            </Header>
            <Form size='large'>
              <Segment stacked>
                {
                  !!error && <Message negative>
                    <p>{error}</p>
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
                <TextField
                  icon='lock'
                  name="password"
                  label='Password'
                  type='password'
                  value={formDetails.password.value||""}
                  handleChange={(name, value) => this.handleChange(name, value)}
                  errorText={!formDetails.password.status ? formDetails.password.errorText : ''}
                />

                <SubmitButton
                  color="teal"
                  label="Login"
                  onSubmit={this.handleSubmit}
                />
              </Segment>
            </Form>
            <Message>
              New to us? <Link href="/signup"><a>Sign Up</a></Link> <br />
               <Link href="/forgotPassword"><a>Forgot Password?</a></Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {

};

export default Login;
