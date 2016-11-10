import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="forge-footer">
        <div className="container">
          <div className="row">
            <div className="col-xs-6">
              <a href="https://developer.autodesk.com/en/docs/viewer/v2/overview/" >
                <img src="images/forge-logo-footer.png" alt="Autodesk Forge" className="footer-logo" />
              </a>
            </div>
            <div className="col-xs-6 footer-copyright">
              2016 Copyright
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
