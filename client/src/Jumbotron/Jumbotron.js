import React, { Component } from 'react';
import './jumbotron.css';
import { viewerResize } from '../Viewer-helpers';
import Viewer from '../Viewer';
import classnames from 'classnames';
import scrollTo from 'scroll-to';

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

      if (this.state.fullscreen) {
        scrollTo(0, 0, {
          ease: 'inQuad',
          duration: 300
        });
        document.body.classList.add('fullscreen')
      } else {
        document.body.classList.remove('fullscreen');
      }

      // resize viewer after css animation
      setTimeout(() => viewerResize(), 300);
    });
  }

  render() {

    const buttonClass = classnames({
      'fa': true,
      'fa-expand': !this.state.fullscreen,
      'fa-compress': this.state.fullscreen,
    });

    return (
      <div className="forge-jumbotron">
        <Viewer />
        <div className="container">
          <div className="forge-logo">
            <img src="images/forge-logo.png" alt="Autodesk Forge" />
          </div>
          <button className="forge-btn" onClick={this.onFullscreen}>
            <i className={buttonClass}></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
