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

// Models

//Steampunk : dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L1NwTTNXNy5mM2Q

import React, { Component } from 'react';
import scrollTo from 'scroll-to';
import Helpers from '../Viewer-helpers';
import './gallery.css';


const tilesData = [
  {
    img: 'images/tie-fighter.png',
    title: 'Fusion Tie Fighter',
    key: '0001',
    urn:'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L1RpZV9GaWd0aGVyX1RveS5mM2Q'
  },
  {
    img: 'images/fusion-rcar.png',
    title: 'Fusion Race Car',
    key: '0002',
    urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L1JDJTIwQ2FyLmYzZA'
  },
  {
    img: 'images/fusion-engine.png',
    title: 'Fusion Engine',
    key: '0003',
    urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L1RWUi00LUN5Y2wtZW5naW5lLmYzZA'
  },
  
  {
    img: 'images/revit-house.png',
    title: 'Revit House',
    key: '0004',
    urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L0hvdXNlLmR3Zng'
    
  },
  {
    img: 'images/urban-house.png',
    title: 'Revit Urban House',
    key: '0005',
    urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L1VyYmFuJTIwSG91c2UlMjAtJTIwMjAxNS5ydnQ'
  },
  {
    img: 'images/revit-factory.png',
    title: 'Revit Factory',
    key: '0006',
    urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0LzNkRmFjdG9yeS5kd2Y'
  },
];


class Gallery extends Component {

  onTileSelect(tile, e) {
    e.preventDefault();

    // Scroll to top
    scrollTo(0, 0, {
      ease: 'inQuad',
      duration: 300
    });

    // Starts loading once it scrolls
    setTimeout(
      () => Helpers.launchViewer("viewerDiv", tile.urn),
      300
    );
  }

   render() {
    return (
      <div className="forge-gallery">
        <div className="container">
          <div className="row">
            {tilesData.map((tile, index) =>
              (
                <div className="col-md-4 col-xs-6 tile" key={index}>
                  <a href="#" onClick={this.onTileSelect.bind(this, tile)}>
                    <img className="tile-avatar" src={tile.img} alt={tile.title} />
                  </a>
                  <div className="tile-title">{tile.title}</div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    )
	}
}

export default Gallery;
