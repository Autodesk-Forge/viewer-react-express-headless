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
import Viewer from '../Viewer/Viewer';
import classnames from 'classnames';
import scrollTo from 'scroll-to';
import Properties from '../Properties'
import {
  viewerResize,
  viewerExplode,
  toggleExplosion,
  toggleRotation,
  stopMotion,
  modelRestoreState,
} from '../Viewer/Viewer-helpers';

class Jumbotron extends Component {

  constructor() {
    super();

    this.state = {
      fullscreen: false,
      explode: false,
      expMotion: false,
      rotMotion: false,
      resetState: false,
      properties: false,
      value: 0
    }

    this.onFullscreen = this.onFullscreen.bind(this);
    this.onExplode = this.onExplode.bind(this);
    this.onExplodeAnimation = this.onExplodeAnimation.bind(this);
    this.onRotateAnimation = this.onRotateAnimation.bind(this);
    this.onResetState = this.onResetState.bind(this);
    this.onOrientationChange = this.onOrientationChange.bind(this);
    this.onPropertiesDisplay = this.onPropertiesDisplay.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
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
        this.onResetState();
        if (this.state.explode){
          document.body.classList.remove('explode');
        }

        this.setState({
          fullscreen: false,
          explode: false,
          expMotion: false,
          rotMotion: false,
          resetState: false,
          properties: false,
          value: 0
        })
      }

      // resize viewer after css animation
      setTimeout(() => viewerResize(), 300);
    });
  }

  onPropertiesDisplay(){
    this.setState({ properties: !this.state.properties }, () => {
      if (this.state.properties) {
        document.body.classList.add('properties-show');
      } else {
        document.body.classList.remove('properties-show');
      }
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
    this.setState({ expMotion: !this.state.expMotion}, () => {
      if (this.state.expMotion) {
        document.body.classList.add('explode-motion')
        toggleExplosion();
      } else {
        document.body.classList.remove('explode-motion');
        toggleExplosion();
      }
    });
  }

  onRotateAnimation() {
    this.setState({ rotMotion: !this.state.rotMotion }, () => {
      if (this.state.rotMotion) {
        document.body.classList.add('rotate-motion')
        toggleRotation();
      } else {
        document.body.classList.remove('rotate-motion');
        toggleRotation();
      }
    });
  }

  onResetState() {
    document.body.classList.remove('explode', 'explode-motion', 'rotate-motion');
    this.setState({explode: false, expMotion: false, rotMotion: false});
    stopMotion();
    modelRestoreState();
  }

  onSelectionChange() {
    if (!this.state.properties) {
      return;
    }

    // this.setState({
    //
    // })
  }

  handlePropertiesClose = () => {
    this.setState({ properties: false })
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

    const propertiesBtnClass = classnames({
      'properties-btn': true,
      'btn--active': this.state.properties,
      'btn--deactive': !this.state.properties
    })

    const explodeBtnClass = classnames({
      'explode-btn': true,
      'btn--active': this.state.explode,
      'btn--deactive': !this.state.explode
    })

    const explodeMotionBtnClass = classnames({
      'explode-motion-btn': true,
      'expbtn--active': this.state.expMotion,
      'expbtn--deactive': !this.state.expMotion
    })

    const rotateMotionBtnClass = classnames({
      'rotate-motion-btn': true,
      'rotbtn--active': this.state.rotMotion,
      'rotbtn--deactive': !this.state.rotMotion
    })

    const resetBtnClass = classnames({
      'reset-btn': true,
      'resetbtn--deactive': !this.state.rotMotion
    })

    return (
      <div className="forge-jumbotron">
        <Viewer />
        <div className="forge-logo">
            <img src="images/forge-logo.png" alt="Autodesk Forge" />
        </div>
        <div className="container safari-only">
          <button className="forge-btn" onClick={this.onFullscreen}>
            <i className={buttonClass}></i>
          </button>
          <button className={propertiesBtnClass} onClick={this.onPropertiesDisplay} >
            <i className={propertiesClass}></i>
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
          <button className={resetBtnClass} onClick={this.onResetState} >
            <i className={resetClass}></i>
          </button>

          {
            this.state.properties
             ? <Properties onClose={this.handlePropertiesClose} />
             : null
          }

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
