/* global Autodesk */

import React, { Component } from 'react';
import Client from './Client';
import Helpers from './Viewer-helpers';

var getToken = { accessToken: Client.getaccesstoken()};

class Viewer extends Component {

    componentDidMount() {
        console.log('comp mount');
        getToken.accessToken.then((myToken) => {
            var options = {
                env: 'AutodeskProduction',
                accessToken: myToken.access_token
            };
            var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L2xlZ28tcmFjZWNhci4zZG0';
                  
            Autodesk.Viewing.Initializer(options, function onInitialized(){
                Autodesk.Viewing.Document.load(documentId, Helpers.onDocumentLoadSuccess, Helpers.onDocumentLoadFailure);
            })
        })
    }
    
	render() {       
        return (
            <div className='viewerStyle' id="viewerDiv" />
        );
	}
}

export default Viewer;