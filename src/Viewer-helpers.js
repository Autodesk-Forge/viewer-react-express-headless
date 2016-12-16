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


/* global Autodesk, THREE */
import Client from './Client';
var viewer;
var getToken = { accessToken: Client.getaccesstoken()};
var explodeScale = 0;
var startExplosion = null;
var explosionReq;
var isExploding = false;
var outwardExplosion = true;
var startRotation = null;
var rotationReq;
var isRotating = false;


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


    ////// LOCAL ENV SETUP - FOR OFFLINE VIEWING//////
    // var initOptions = {
    //   path: Autodesk.Viewing.Private.getParameterByName('path') || '../v8/0.svf',
    //   env: 'Local'
    // };
    //////////////////////////////////////////////////

   // console.log('file path', initOptions.path);
    var viewerElement = document.getElementById(div);
    viewer = new Autodesk.Viewing.Viewer3D(viewerElement, {});
    
    Autodesk.Viewing.Initializer(
      options,
      function () {
        viewer.initialize();
        viewer.prefs.tag('ignore-producer')
        loadDocument(options.document);    
      }
    );


    // INIT FOR OFFLINE VIEWING//
    // viewer.initialize()
    // viewer.loadModel(initOptions.path)
    /////////////////////////////

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
        //viewer.setLightPreset(10);
        viewer.fitToView();
        //debugger;
    }


export function viewerResize() {
  viewer.resize();
}

export function viewerExplode(num){
  viewer.explode(num);
}

 /**
     * toggle explosion motion
     * @param  boolean cancelMotion - true if cancel motion is requested
     */
export function toggleExplosion(cancelMotion) {
      if (cancelMotion || isExploding) {
        cancelAnimationFrame(explosionReq);
        isExploding = false;
        if (cancelMotion) {
          explodeScale = 0;
          viewer.explode(explodeScale);
        }
      } else {
        explodeMotion();
        isExploding = true;
      }
    }
    
/**
  * Recursive function for calling requestAnimationFrame for explode motion
*/

export function explodeMotion(timestamp) {
      if (!startExplosion) {
        startExplosion = timestamp;
      }
      var progress = timestamp - startExplosion;
      startExplosion = timestamp;
      var explodeStep = 0.0002 * (progress || 0);
      // explode outward and inward
      if (outwardExplosion) {
        explodeScale += explodeStep;
      } else {
        explodeScale -= explodeStep;
      }
      if (explodeScale > 1) {
        outwardExplosion = false;
        explodeScale = 1; // this solves when user go to another browser tab
      } else if (explodeScale < 0) {
        outwardExplosion = true;
        explodeScale = 0; // this solves when user go to another browser tab
      }
      viewer.explode(explodeScale);
      explosionReq = window.requestAnimationFrame(explodeMotion);
    };

 /**
     * recursive function for rotation motion each time page refreshes
     */
export function rotateMotion(timestamp) {
      if (!startRotation) {
        startRotation = timestamp;
      }
      var progress = timestamp - startRotation;
      startRotation = timestamp;
      var rotateStep = 0.0005 * (progress || 0);
      // get the up axis
      var worldUp = viewer.navigation.getWorldUpVector();
      // get the current position
      var pos = viewer.navigation.getPosition();
      // copy that position
      var position = new THREE.Vector3(pos.x, pos.y, pos.z);
      // set the rotate axis
      var rAxis = new THREE.Vector3(worldUp.x, worldUp.y, worldUp.z);
      var matrix = new THREE.Matrix4().makeRotationAxis(rAxis, rotateStep);
      //apply the new position
      position.applyMatrix4(matrix);
      viewer.navigation.setPosition(position);
      rotationReq = window.requestAnimationFrame(rotateMotion);
    }


     /**
     * Toggle the rotation movement
     * @param  boolean cancelMotion true if motion is to be cancelled
     */
export function toggleRotation(cancelMotion) {
      if (cancelMotion || isRotating) {
        cancelAnimationFrame(rotationReq);
        isRotating = false;
      } else {
        rotateMotion();
        isRotating = true;
      }
    }
    
 export function stopMotion() {
      toggleExplosion(true);
      toggleRotation(true);
    }


const Helpers = {
  launchViewer,
  loadDocument
};

export default Helpers;
