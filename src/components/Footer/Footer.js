/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Jaime Rosales 2016 - Forge Developer Partner Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
   render() {
    return (
      <div className="forge-footer">
        <div className="container">
          <div className="row">
            <div className="col-xs-6">
             <a href="https://github.com/jaimerosales/viewer-react-express-headless">View on GitHub <i className="fa fa-github"></i></a>
            </div>
            <div className="col-xs-6 footer-copyright">
              &#169; 2016 Copyright Autodesk. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
