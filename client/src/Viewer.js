/* global Autodesk */

//viewer component
import React, { Component } from 'react';
import Client from './Client';

var getToken = { accessToken: Client.getaccesstoken()};
var viewer;  

class Viewer extends Component {

	
    componentDidMount() {
        getToken.accessToken.then((myToken) => {

             
            var options = {
                env: 'AutodeskProduction',
                accessToken: myToken.access_token
            };
            var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L2xlZ28tcmFjZWNhci4zZG0';
                // this.setState()
            console.log('response', myToken);
            console.log('my URN', documentId);
           
            Autodesk.Viewing.Initializer(options, function onInitialized(){
                Autodesk.Viewing.Document.load(documentId, this.onDocumentLoadSuccess, this.onDocumentLoadFailure);
            })

        })
       
    }

    onDocumentLoadSuccess(doc) {
        // Instantiate viewer factory
        // A document contains references to 3D and 2D viewables.
            var viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type':'geometry'}, true);
            if (viewables.length === 0) {
                console.error('Document contains no viewables.');
                return;
            }

            // Choose any of the avialble viewables
            var initialViewable = viewables[0];
            var svfUrl = doc.getViewablePath(initialViewable);
            var modelOptions = {
                sharedPropertyDbPath: doc.getPropertyDbPath()
            };

            var viewerDiv = document.getElementById('viewerDiv');
            viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
            viewer.start(svfUrl, modelOptions, this.onLoadModelSuccess, this.onLoadModelError);
    }
       
        /**
         * Autodesk.Viewing.Document.load() failuire callback.
         */
    onDocumentLoadFailure(viewerErrorCode) {
        console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
    }

        /**
         * viewer.loadModel() success callback.
         * Invoked after the model's SVF has been initially loaded.
         * It may trigger before any geometry has been downloaded and displayed on-screen.
         */
    onLoadModelSuccess(model) {
        console.log('onLoadModelSuccess()!');
        console.log('Validate model loaded: ' + (viewer.model === model));
        console.log(model);
    }

        /**
         * viewer.loadModel() failure callback.
         * Invoked when there's an error fetching the SVF file.
         */
    onLoadModelError(viewerErrorCode) {
        console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
    }


	render() {
			var viewerStyle = {
				height: '75%', 
  				width: '100%' 
  				
			}
		
			return (
                <div style={viewerStyle} id="viewerDiv"> </div>
			);
		}
}

export default Viewer;