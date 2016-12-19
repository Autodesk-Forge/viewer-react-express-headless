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
import { viewerResize, viewerExplode, toggleExplosion, toggleRotation, stopMotion, modelRestoreState  } from '../Viewer-helpers';
import Viewer from '../Viewer';
import classnames from 'classnames';
import scrollTo from 'scroll-to';

class Jumbotron extends Component {

  constructor() {
    super();

    this.state = {
      fullscreen: false,
      explode: false,
      expMotion: false,
      rotMotion: false,
      resetState: false,
      disabled: false,
      value: 0
    }

    this.onFullscreen = this.onFullscreen.bind(this);
    this.onExplode = this.onExplode.bind(this);
    this.onExplodeAnimation = this.onExplodeAnimation.bind(this);
    this.onRotateAnimation = this.onRotateAnimation.bind(this);
    this.onResetState = this.onResetState.bind(this);
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

  onExplodeAnimation() {
    this.setState({ expMotion: !this.state.expMotion, disabled: true }, () => {
      if (this.state.expMotion) {
        document.body.classList.add('explode-motion')
        toggleExplosion();
      } else {
        document.body.classList.remove('explode-motion');
        toggleExplosion();
        if (this.state.rotMotion === false){
           this.setState({disabled: false});
        }
      }
    });
  }

  onRotateAnimation() {
    this.setState({ rotMotion: !this.state.rotMotion, disabled: true }, () => {
      if (this.state.rotMotion) {
        document.body.classList.add('rotate-motion')
        toggleRotation();
      } else {
        document.body.classList.remove('rotate-motion');
        toggleRotation();
        if (this.state.expMotion === false){
           this.setState({disabled: false});
        }
       
      }
    });
  }

  onResetState() {
    stopMotion();
    modelRestoreState();
  }

  render() {

    const buttonClass = classnames({
      'fa': true,
      'fa-expand': !this.state.fullscreen,
      'fa-compress': this.state.fullscreen,
    });

    // const propertiesClass = classnames({
    //   'fa': true,
    //   'fa-list': this.state.fullscreen,
    // });

    const explodeClass = classnames({
      'fa': true,
      'fa-cubes': this.state.fullscreen,
    });

    const explodeMotionClass = classnames({
      'fa': true,
      'fa-bomb': this.state.fullscreen,
    });

    const rotateMotionClass = classnames({
      'fa': true,
      'fa-repeat': this.state.fullscreen,
    });

    const resetClass = classnames({
      'fa': true,
      'fa-refresh': this.state.fullscreen,
    });

    const explodeBtnClass = classnames({
      'explode-btn': true,
      'btn--active': this.state.explode
    })

    const explodeMotionBtnClass = classnames({
      'explode-motion-btn': true,
      'expbtn--active': this.state.expMotion
    })

    const rotateMotionBtnClass = classnames({
      'rotate-motion-btn': true,
      'rotbtn--active': this.state.rotMotion
    })

    const resetBtnClass = classnames({
      'reset-btn': true,
      'resetbtn--deactive': !this.state.rotMotion
    })

   

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
          <button className={explodeBtnClass} onClick={this.onExplode} >
            <i className={explodeClass}></i>
          </button>
          <button className={explodeMotionBtnClass} onClick={this.onExplodeAnimation} >
            <i className={explodeMotionClass}></i>
          </button>
          <button className={rotateMotionBtnClass} onClick={this.onRotateAnimation} >
            <i className={rotateMotionClass}></i>
          </button>
          <button disabled={this.state.disabled} className={resetBtnClass} onClick={this.onResetState} >
            <i className={resetClass}></i>
          </button>
          <input type="range" 
              className="range-style"
              min="0" 
              max="100"
              value={this.state.value}
              onChange={this.handleValueChange}
          />
        </div>
      </div>
    );
  }
}

export default Jumbotron;



// <button className="properties-btn" onClick={this.onFullscreen} >
          //   <i className={propertiesClass}></i>
          // </button>