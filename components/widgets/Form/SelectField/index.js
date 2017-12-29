/**
*
* SelectField
*
*/

import React from 'react';

class SelectField extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

SelectField.propTypes = {

};

export default SelectField;
