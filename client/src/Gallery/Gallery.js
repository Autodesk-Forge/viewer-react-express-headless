import React, { Component } from 'react';
import './gallery.css';

const tilesData = [
  {
    img: 'images/rhino-legocar.png',
    title: 'Rhino Lego',
  },
  {
    img: 'images/inventor-racecar.png',
    title: 'Inventor Race Car',
  },
  {
    img: 'images/lambo.png',
    title: 'Fusion Lambo',
  },
  {
    img: 'images/revit-house.png',
    title: 'Revit House',
  },
  {
    img: 'images/fusion-engine.png',
    title: 'Fusion Engine',
  },
  {
    img: 'images/revit-factory.png',
    title: 'Revit Factory',
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
                  <a href="#" onClick={() => alert('hello')}>
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
