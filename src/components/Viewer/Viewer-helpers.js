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
import { debounce, uniq } from 'lodash';
import { actions } from '../../actions';
import { store } from '../../store';

import Client from '../Client';
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
var tileId = '';
export var properties = {};



function launchViewer(div, urn, id) {
  tileId = id;
  getToken.accessToken.then((token) => {
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
        viewer.prefs.tag('ignore-producer')
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
        viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, onGeometryLoaded);
        viewer.addEventListener(Autodesk.Viewing.AGGREGATE_SELECTION_CHANGED_EVENT, debounce(() => {
          console.log('selection change')
          getModelProperties()
            .then((modelProperties) =>
              store.dispatch(actions.getViewerProperties(modelProperties))
            )
            .catch(() =>
              store.dispatch(actions.getViewerProperties([]))
            )
        }), 200);

        // If you want to display the edges of your models, set displayEdges to true
        let displayEdges = true;
        viewer.loadModel(doc.getViewablePath(geometryItems[0]), { isAEC: displayEdges }); // show 1st view on this document...
        viewer.setDisplayEdges(displayEdges)
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
        viewer.fitToView();
        viewer.setQualityLevel(false,false); // Getting rid of Ambientshadows to false to avoid blackscreen problem in Viewer.
    }


function getModelProperties() {
  return new Promise((resolve, reject) => {
    const dbId = viewer.getSelection()[0];

    if (viewer.getSelectionCount() !== 1) {
      return reject('Invalid selection count');
    }

    return new Promise((resolve) => {
      viewer.model.getProperties(dbId, (item) => {
        const items = item.properties.filter((property) => !property.hidden);
        resolve(items);
      });
    })
    .then((list) => {

      // Normalize displayCategory property in case it's falsy
      list = list.map(item => ({
        ...item,
        displayCategory: item.displayCategory || 'Miscellaneous'
      }));

      // Unique list of categories
      const categories = uniq(list.map(item => item.displayCategory));

      // Model data to be consumed
      // Ex: [ {category: 'Miscellaneous', data: []} ]
      const properties = categories.map(category => (
        {
          category,
          data: list.filter(item => item.displayCategory === category)
        }
      ));

      resolve(properties);
    });
  });
}

export function viewerResize() {
  viewer.resize();
}

export function viewerExplode(num){
  viewer.explode(num);
}

export function modelRestoreState(){
  var originalState = "";

  switch (tileId){
    case "0001":
      originalState = JSON.parse('{"guid":"f075a989156eb711398","seedURN":"dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L1RpZV9GaWd0aGVyX1RveS5mM2Q","overrides":{"transformations":[]},"objectSet":[{"id":[],"isolated":[],"hidden":[],"explodeScale":0,"idType":"lmv"}],"viewport":{"name":"","eye":[145.8184640788883,93.51676504768685,-124.19785909734301],"target":[0,0,0.0000019073486328125],"up":[-0.3340034881841154,0.8986169812472194,0.28448056329910826],"worldUpVector":[0,1,0],"pivotPoint":[0,0,0.0000019073486328125],"distanceToOrbit":213.15139804714164,"aspectRatio":1.9929737351528332,"projection":"perspective","isOrthographic":false,"fieldOfView":61.92751520437556},"renderOptions":{"environment":"Rim Highlights","ambientOcclusion":{"enabled":false,"radius":10,"intensity":0.4},"toneMap":{"method":1,"exposure":-9,"lightMultiplier":-1e-20},"appearance":{"ghostHidden":true,"ambientShadow":false,"antiAliasing":true,"progressiveDisplay":true,"displayLines":true}},"cutplanes":[]}');
      console.log("Restoring State for Tile:", tileId);
      break;
    case "0002":
      originalState = JSON.parse('{"guid":"f075a989156eb711397","seedURN":"dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L1JDJTIwQ2FyLmYzZA","overrides":{"transformations":[]},"objectSet":[{"id":[],"isolated":[],"hidden":[],"explodeScale":0,"idType":"lmv"}],"viewport":{"name":"","eye":[268.15901156738664,268.1590007567955,268.15899179720685],"target":[0,-0.0000019073486328125,-0.00000762939453125],"up":[0,1,0],"worldUpVector":[0,1,0],"pivotPoint":[0,-0.0000019073486328125,-0.00000762939453125],"distanceToOrbit":464.4650203923889,"aspectRatio":1.9409698157397892,"projection":"orthographic","isOrthographic":true,"orthographicHeight":464.46502039238896},"renderOptions":{"environment":"Rim Highlights","ambientOcclusion":{"enabled":false,"radius":10,"intensity":0.4},"toneMap":{"method":1,"exposure":-9,"lightMultiplier":-1e-20},"appearance":{"ghostHidden":true,"ambientShadow":false,"antiAliasing":true,"progressiveDisplay":true,"displayLines":true}},"cutplanes":[]}');
      console.log("Restoring State for Tile:", tileId);
      break;
    case "0003":
      originalState = JSON.parse('{"guid":"f075a989156eb711399","seedURN":"dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L1RWUi00LUN5Y2wtZW5naW5lLmYzZA","overrides":{"transformations":[]},"objectSet":[{"id":[],"isolated":[],"hidden":[],"explodeScale":0,"idType":"lmv"}],"viewport":{"name":"","eye":[947.8717757705549,-947.8718237856292,947.8718169263327],"target":[0,0,0],"up":[0,1,0],"worldUpVector":[0,1,0],"pivotPoint":[0,0,0],"distanceToOrbit":1641.7621261779516,"aspectRatio":2.47171569916115,"projection":"orthographic","isOrthographic":true,"orthographicHeight":1641.7621261779514},"renderOptions":{"environment":"Rim Highlights","ambientOcclusion":{"enabled":false,"radius":10,"intensity":0.4},"toneMap":{"method":1,"exposure":-9,"lightMultiplier":-1e-20},"appearance":{"ghostHidden":true,"ambientShadow":false,"antiAliasing":true,"progressiveDisplay":true,"displayLines":true}},"cutplanes":[]}');
      console.log("Restoring State for Tile:", tileId);
      break;
    case "0004":
      originalState = JSON.parse('{"guid":"f075a989156eb711400","seedURN":"dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L0hvdXNlLmR3Zng","overrides":{"transformations":[]},"objectSet":[{"id":[],"isolated":[],"hidden":[],"explodeScale":0,"idType":"lmv"}],"viewport":{"name":"","eye":[-163.8662266489145,0,101.51004011675508],"target":[0,0,0],"up":[0,1,0],"worldUpVector":[0,1,0],"pivotPoint":[0,0,0],"distanceToOrbit":192.76002822332916,"aspectRatio":2.0663910331477187,"projection":"perspective","isOrthographic":false,"fieldOfView":46.48761986856245},"renderOptions":{"environment":"Rim Highlights","ambientOcclusion":{"enabled":false,"radius":7.3109139716724485,"intensity":0.4},"toneMap":{"method":1,"exposure":-9,"lightMultiplier":-1e-20},"appearance":{"ghostHidden":true,"ambientShadow":false,"antiAliasing":true,"progressiveDisplay":true,"displayLines":true}},"cutplanes":[]}');
      console.log("Restoring State for Tile:", tileId);
      break;
    case "0005":
      originalState = JSON.parse('{"guid":"f075a989156eb711401","seedURN":"dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0L1VyYmFuJTIwSG91c2UlMjAtJTIwMjAxNS5ydnQ","overrides":{"transformations":[]},"objectSet":[{"id":[],"isolated":[],"hidden":[],"explodeScale":0,"idType":"lmv"}],"viewport":{"name":"","eye":[71.29038959242611,-71.98501662992042,67.07221817123673],"target":[0,0,-0.0000019073486328125],"up":[0,0,1],"worldUpVector":[0,0,1],"pivotPoint":[0,0,-0.0000019073486328125],"distanceToOrbit":121.50244842685274,"aspectRatio":0.4481514231771144,"projection":"orthographic","isOrthographic":true,"orthographicHeight":121.50244842685272},"renderOptions":{"environment":"Rim Highlights","ambientOcclusion":{"enabled":false,"radius":5.211787184833593,"intensity":0.4},"toneMap":{"method":1,"exposure":-9,"lightMultiplier":-1e-20},"appearance":{"ghostHidden":true,"ambientShadow":false,"antiAliasing":true,"progressiveDisplay":true,"displayLines":true}},"cutplanes":[]}');
      console.log("Restoring State for Tile:", tileId);
      break;
    case "0006":
      originalState = JSON.parse('{"guid":"f075a989156eb711402","seedURN":"dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dmlld2VyLXJvY2tzLXJlYWN0LzNkRmFjdG9yeS5kd2Y","overrides":{"transformations":[]},"objectSet":[{"id":[],"isolated":[],"hidden":[],"explodeScale":0,"idType":"lmv"}],"viewport":{"name":"","eye":[74.02664223103163,-62.794491882241786,57.115458464302066],"target":[0,-9.5367431640625e-7,-2.384185791015625e-7],"up":[0,0,1],"worldUpVector":[0,0,1],"pivotPoint":[0,-9.5367431640625e-7,-2.384185791015625e-7],"distanceToOrbit":112.62889271319895,"aspectRatio":1.8124895442487394,"projection":"perspective","isOrthographic":false,"fieldOfView":28.656461643949527},"renderOptions":{"environment":"Rim Highlights","ambientOcclusion":{"enabled":false,"radius":2.7574370487702686,"intensity":0.4},"toneMap":{"method":1,"exposure":-9,"lightMultiplier":-1e-20},"appearance":{"ghostHidden":true,"ambientShadow":false,"antiAliasing":true,"progressiveDisplay":true,"displayLines":true}},"cutplanes":[]}');
      console.log("Restoring State for Tile:", tileId);
      break;
    default:
      console.log("Sorry, no model selected");
  }


viewer.restoreState(originalState, false, false);
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
