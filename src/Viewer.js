/* global Autodesk */

import React, { Component } from 'react';
import Helpers from './Viewer-helpers';

class Viewer extends Component {

    componentDidMount() {
         //Lego Car
        var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0LzFfMTB0aF9zY2FsZV9vbl9yb2FkX2NhciUyME1hdGVyaWFscy56aXA';
        Helpers.launchViewer('viewerDiv', documentId );        
    }

	render() {
        return (
            <div className='forge-viewer' id="viewerDiv" />
        );
	}
}

export default Viewer;
