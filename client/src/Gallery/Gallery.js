import React, { Component } from 'react';
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
    key: '0002'
  },
  {
    img: 'images/lambo.png',
    title: 'Fusion Lambo',
    key: '0003'
  },
  {
    img: 'images/revit-house.png',
    title: 'Revit House',
    key: '0004'
  },
  {
    img: 'images/fusion-engine.png',
    title: 'Fusion Engine',
    key: '0005',
    urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L1RWUi00LUN5Y2wtZW5naW5lLmYzZA'
  },
  {
    img: 'images/revit-factory.png',
    title: 'Revit Factory',
    key: '0006',
    urn: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0LzNkRmFjdG9yeS5kd2Y'
  },
];


class Gallery extends Component {

   render() {
    return (
      <div className="forge-gallery">
        <div className="container">
          <div className="row">
            {tilesData.map(tile =>
              (
                <div className="col-md-4 col-xs-6 tile">
                  <a href="#" onClick={() => Helpers.launchViewer("viewerDiv", tile.urn)}>
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
