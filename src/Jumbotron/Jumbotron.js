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
import './jumbotron.css';
import { viewerResize, viewerExplode } from '../Viewer-helpers';
import Viewer from '../Viewer';
import classnames from 'classnames';
import scrollTo from 'scroll-to';

class Jumbotron extends Component {

  constructor() {
    super();

    this.state = {
      fullscreen: false,
      explode: false,
      value: 0
    }

    this.onFullscreen = this.onFullscreen.bind(this);
    this.onExplode = this.onExplode.bind(this);
    this.onOrientationChange = this.onOrientationChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
   
  }

  componentDidMount() {
    window.addEventListener('orientationchange', this.onOrientationChange);
  }

  componentWillUnmount() {
    window.removeEventListener('orientationchange', this.onOrientationChange);
  }

  handleValueChange(event) {
    
    this.setState({
      value: event.target.value
    });
    
    viewerExplode(this.state.value/100);

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
        if (this.state.explode){
          document.body.classList.remove('explode');
        }
      }

      // resize viewer after css animation
      setTimeout(() => viewerResize(), 300);
      //onScreenShot();
    });
  }

  onExplode(){
    this.setState({ explode: !this.state.explode }, () => {
      if (this.state.explode) {
        document.body.classList.add('explode')
      } else {
        document.body.classList.remove('explode');
      }
    });
    
  }

  onOrientationChange() {
    setTimeout(() => viewerResize(), 300);
  }

  render() {

    const buttonClass = classnames({
      'fa': true,
      'fa-expand': !this.state.fullscreen,
      'fa-compress': this.state.fullscreen,
    });


    const propertiesClass = classnames({
      'fa': true,
      'fa-list': this.state.fullscreen,
    });

    const explodeClass = classnames({
      'fa': true,
      'fa-cubes': this.state.fullscreen,
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
          <button className="explode-btn" onClick={this.onExplode} >
            <i className={explodeClass}></i>
          </button>
          <input type="range" 
              className= "range-style"
              min="0" 
              max="100"
              value={this.state.value}
              onChange={this.handleValueChange}
          />
          <span className="range-span" id="range">{this.state.value}</span>
        </div>
      </div>
    );
  }
}

export default Jumbotron;



// <button className="properties-btn" onClick={this.onFullscreen} >
          //   <i className={propertiesClass}></i>
          // </button>