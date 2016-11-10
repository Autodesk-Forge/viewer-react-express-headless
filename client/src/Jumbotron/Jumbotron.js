import React, { Component } from 'react';
import './jumbotron.css';
import { viewerResize } from '../Viewer-helpers';
import Viewer from '../Viewer';

class Jumbotron extends Component {

  constructor() {
    super();

    this.state = {
      fullscreen: false
    }

    this.onFullscreen = this.onFullscreen.bind(this);
  }

  onFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen }, () => {
      /// toggle fullscreen css class
      this.state.fullscreen
        ? document.body.classList.add('fullscreen')
        : document.body.classList.remove('fullscreen');

      // resize viewer after css animation
      setTimeout(() => viewerResize(), 300);
    });
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
