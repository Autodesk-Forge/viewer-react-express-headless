import React, { Component } from 'react';
import './jumbotron.css';

import { toggleFullscreen } from '../Viewer-helpers';
import Viewer from '../Viewer';

class Jumbotron extends Component {

  constructor() {
    super();

    this.onFullscreen = this.onFullscreen.bind(this);
  }

  onFullscreen() {
    toggleFullscreen();
  }

  render() {
    return (
      <div className="forge-jumbotron">
        <Viewer />
        <div className="container">
          <div className="forge-logo">
            <img src="images/forge-logo.png" alt="Autodesk Forge" />
          </div>
          <button className="forge-btn" onClick={this.onFullscreen}>
            <i className="fa fa-plus"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
