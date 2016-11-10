/* global Autodesk */

import React, { Component } from 'react';
import Helpers from './Viewer-helpers';

class Viewer extends Component {

    componentDidMount() {
         //Lego Car
        var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L2xlZ28tcmFjZWNhci4zZG0';
        Helpers.launchViewer('viewerDiv', documentId );        
    }

	render() {
        return (
            <div className='forge-viewer' id="viewerDiv" />
        );
	}
}

export default Viewer;
