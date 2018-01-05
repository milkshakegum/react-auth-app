/**
*
* EditPassword
*
*/

import React from 'react';
import Link from 'next/link';
import { Grid, Icon, Header, Message } from 'semantic-ui-react';

import TextField from 'components/widgets/Form/TextField';
import SubmitButton from 'components/widgets/Form/SubmitButton';

class EditPassword extends React.Component { // eslint-disable-line react/prefer-stateless-function

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
    const { formDetails, error, success } = this.props;
    return (
      <div>
        <Grid
          textAlign='center'
          style={{ height: '100%', }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450, marginTop: "13vh" }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Icon name="user" />
              {' '}Edit Password
            </Header>
            {
              !!error && <Message negative>
                <p>{error}</p>
              </Message>
            }
            {
              !!success && <Message success>
                <p>{success}</p>
              </Message>
            }
            <TextField
              label="Old Password"
              name="old_password"
              type="password"
              value={formDetails.old_password.value||""}
              handleChange={this.handleChange}
              errorText={!formDetails.old_password.status ? formDetails.old_password.errorText : ''}
            />
            
            <TextField
              label="New Password"
              name="new_password"
              type="password"
              value={formDetails.new_password.value||""}
              handleChange={this.handleChange}
              errorText={!formDetails.new_password.status ? formDetails.new_password.errorText : ''}
            />

            <TextField
              label="Confirm New Password"
              name="new_password_confirm"
              type="password"
              value={formDetails.new_password_confirm.value||""}
              handleChange={this.handleChange}
              errorText={!formDetails.new_password_confirm.status ? formDetails.new_password_confirm.errorText : ''}
            />
            {/* <TextField
              icon="lock"
              label="Password"
              name="password"
              type="password"
              value={formDetails.password.value||""}
              handleChange={this.handleChange}
              errorText={!formDetails.password.status ? formDetails.password.errorText : ''}
            /> */}

            <SubmitButton
              color="teal"
              label="Edit Profile"
              onSubmit={this.handleSubmit}
            />
            <Message>
              Go back to your <Link href="/profile"><a>Profile</a></Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

EditPassword.propTypes = {

};

export default EditPassword;
