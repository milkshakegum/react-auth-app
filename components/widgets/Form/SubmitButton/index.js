/**
*
* SubmitButton
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

class SubmitButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { style, label, size, onSubmit, icon, ...props } = this.props;

    return (
      <Button
        fluid
        size={size}
        onClick={onSubmit}
        {...props}
      >
        {!!icon && <Icon name={icon} />}
        {label}
      </Button>
    );
  }
}

SubmitButton.propTypes = {
  style: PropTypes.object,
  size: PropTypes.string,
  label: PropTypes.string.isRequired,
  iconStyle: PropTypes.object,

  onSubmit: PropTypes.func.isRequired,

};

SubmitButton.defaultProps = {
    label: 'Save',
    size: 'large',
    icon: null,
}
export default SubmitButton;
