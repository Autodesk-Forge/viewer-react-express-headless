import React, { Component } from 'react';
import Viewer from './Viewer';
import Gallery from './Gallery';
//import './App.css';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



class App extends Component {
  
  getChildContext() {
                return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    const bodyStyle = {
      height: '100%',
      width: '100%'
    };
    const viewerStyle = { 
      height: '55%',
      width: '100%'
    }; 

    const gallerybodyStyle = { 
      height: '40%',
      width: '100%',
      position: 'absolute',
      backgroundColor: '#3566CC' 
    }; 

    const gallerysliderStyle = { 
      width: '80%',
      position: 'absolute',
      marginTop: '50px',
      left: '10%'
    }; 

    const buttonStyle = {
      position: 'fixed', 
      zIndex: '2',
      top: '52%',
      right: '15%',
      borderRadius: '50px', 
      backgroundColor: '#EE8822', 
      height: '70px', 
      width: '70px',
      border: '5px solid #EE8822',
      fontSize: '16px',
      color: 'white'
    };

    const logoStyle = {
      position: 'fixed', 
      zIndex: '2',
      top: '4%',
      left: '21%',
      height: '7%',
      width: 'auto',
      backgroundColor: 'transparent'
    }

    

    return (
      <div className='container' style={{position: 'fixed', height: '100%', width: '100%', padding: '0'}}>
        <div className='textadsk' style={logoStyle}>
          <img src={require('./images/forge-logo.png')} alt="Autodesk Forge" style={logoStyle} />
        </div>
        <button className='button' style={buttonStyle}> [+]
        </button>
        <div className='body' style={bodyStyle}>
          <div className='viewer' style={viewerStyle}>
            <Viewer />
          </div>
          <div className='galleryBody' style={gallerybodyStyle}>
            <div className='gallerySlider' style={gallerysliderStyle} >
              <Gallery />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };

export default App;
