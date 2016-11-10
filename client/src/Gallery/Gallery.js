import React, { Component } from 'react';
import scrollTo from 'scroll-to';
import Helpers from '../Viewer-helpers';
import './gallery.css';

const tilesData = [
  {
    img: 'images/rhino-legocar.png',
    title: 'Rhino Lego',
    key: '0001',
    urn:'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L2xlZ28tcmFjZWNhci4zZG0'
  },
  {
    img: 'images/inventor-racecar.png',
    title: 'Inventor Race Car',
    key: '0002',
    urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0LzFfMTB0aF9zY2FsZV9vbl9yb2FkX2NhciUyME1hdGVyaWFscy56aXA'
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
