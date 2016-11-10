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
        viewer.load(doc.getViewablePath(geometryItems[0])); // show 1st view on this document...
      }
    },
    function (errorMsg) { // onErrorCallback
      console.log(errorMsg);
    }
  )
}

export function toggleFullscreen() {

}

const Helpers = {
  launchViewer,
  loadDocument
};

export default Helpers;