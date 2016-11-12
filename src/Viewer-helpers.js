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


/* global Autodesk */
import Client from './Client';
var viewer;
var getToken = { accessToken: Client.getaccesstoken()};

function launchViewer(div, urn) {
  console.log("Launching Autodesk Viewer for: " + urn);
  getToken.accessToken.then((token) => {
    console.log('new token', token);
    var options = {
      'document': urn,
      'env': 'AutodeskProduction',
      'accessToken': token.access_token
      // 'refreshToken': getForgeToken
    };

    var viewerElement = document.getElementById(div);
    viewer = new Autodesk.Viewing.Viewer3D(viewerElement, {});
    Autodesk.Viewing.Initializer(
      options,
      function () {
        viewer.initialize();
        loadDocument(options.document);
        
      }
    );
  })
}


function loadDocument(documentId){
  Autodesk.Viewing.Document.load(
    documentId,
    function (doc) { // onLoadCallback
      var geometryItems = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type':'geometry'}, true);
      if (geometryItems.length > 0) {
        geometryItems.forEach(function (item, index) {
        });
        viewer.addEventListener(
                        Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
                        onGeometryLoaded);
        viewer.load(doc.getViewablePath(geometryItems[0])); // show 1st view on this document...
      }
    },
    function (errorMsg) { // onErrorCallback
      console.log(errorMsg);
    }
  )
}


//////////////////////////////////////////////////////////////////////////
// Model Geometry loaded callback
//
//////////////////////////////////////////////////////////////////////////
function onGeometryLoaded(event) {
        var viewer = event.target;
        viewer.removeEventListener(
                Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
                onGeometryLoaded);
        viewer.setLightPreset(10);
        viewer.fitToView();
    }


export function viewerResize() {
  viewer.resize();
}

const Helpers = {
  launchViewer,
  loadDocument
};

export default Helpers;
