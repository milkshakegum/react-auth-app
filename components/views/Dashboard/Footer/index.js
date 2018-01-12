/**
*
* Footer
*
*/

import React from 'react';

class Footer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <footer className="ui inverted vertical footer segment customFooter" >
        <div className="ui center aligned container">
          Proudly Powered by <a href="https://www.cosmicjs.com" target="_blank">Cosmic JS</a>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {

};

export default Footer;
