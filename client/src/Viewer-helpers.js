/* global Autodesk */
var viewer;

function onDocumentLoadSuccess(doc) {
    console.log('doc load');
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
        viewer = new Autodesk.Viewing.Viewer3D(viewerDiv);
        viewer.start(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
}

/**
* viewer.loadModel() success callback.
* Invoked after the model's SVF has been initially loaded.
* It may trigger before any geometry has been downloaded and displayed on-screen.
*/
function onLoadModelSuccess(model) {
    console.log('onLoadModelSuccess()!');
    console.log('Validate model loaded: ' + (viewer.model === model));
    console.log(model);
}

/**
* viewer.loadModel() failure callback.
* Invoked when there's an error fetching the SVF file.
*/
function onLoadModelError(viewerErrorCode) {
    console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
}


/**
* Autodesk.Viewing.Document.load() failuire callback.
*/
function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

export function toggleFullscreen() {
  viewer.screenModeDelegate.setMode(Autodesk.Viewing.ScreenMode.kNormal)
  // debugger;
  // let delegate = new Autodesk.Viewing.AppScreenModeDelegate(viewer);
  // Autodesk.Viewing.ScreenMode.kFullBrowser
  // Autodesk.Viewing.ScreenMode.KFullScreen
  // Autodesk.Viewing.ScreenMode.kNormal
  // delegate.setMode(Autodesk.Viewing.ScreenMode.KFullScreen);
  // console.log('delegate', delegate);
  // delegate.doScreenModeChange();
  // console.log(delegate.getNextMode());
}

const Helpers = {
  onDocumentLoadSuccess,
  onDocumentLoadFailure,
};

export default Helpers;
