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
            //Lego Car
           var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L2xlZ28tcmFjZWNhci4zZG0';

           // Factory
           // var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0LzNkRmFjdG9yeS5kd2Y';

           // Engine
            // var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L1RWUi00LUN5Y2wtZW5naW5lLmYzZA';



            Autodesk.Viewing.Initializer(options, function onInitialized(){
                Autodesk.Viewing.Document.load(documentId, Helpers.onDocumentLoadSuccess, Helpers.onDocumentLoadFailure);
            })
        })
    }

	render() {
        return (
            <div className='forge-viewer' id="viewerDiv" />
        );
	}
}

export default Viewer;
