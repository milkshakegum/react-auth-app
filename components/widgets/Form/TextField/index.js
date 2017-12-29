/**
*
* TextField
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';

class TextField extends React.Component { // eslint-disable-line react/prefer-stateless-function

  handleChange = (event) => {
    const { name, value } = event.target;
    this.props.handleChange(name, value);
  }

  render() {
    const { icon, label, iconPosition, handleChange, name, value, errorText, ...props } = this.props;
    return (
      <div style={{ margin: "3vh 0"}}>
        <Form.Input
          fluid
          icon={icon}
          iconPosition={iconPosition}
          placeholder={label}
          name={name}
          value={value}
          onChange={this.handleChange}
          {...props}
        />
      {
        !!errorText && <Message negative>
          <p>{errorText}</p>
        </Message>
      }
      </div>
    );
  }
}

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  errorText: PropTypes.string,
  iconPosition: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

TextField.defaultProps = {
  iconPosition: "left",
  icon: "user",
}
export default TextField;
