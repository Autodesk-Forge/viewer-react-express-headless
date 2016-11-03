import React, { Component } from 'react';
import Viewer from './Viewer';
import Gallery from './Gallery';
//import './App.css';

class App extends Component {
  render() {
    const bodyStyle = {
      height: '100%',
      width: '100%'
    };
    const viewerStyle = { 
      height: '45%',
      width: '100%' 
    }; 

    const buttonStyle = {
      position: 'fixed', 
      zIndex: '2',
      top: '42%',
      right: '15%',
      'border-radius': '50px', 
      backgroundColor: '#EE8822', 
      height: '100px', 
      width: '100px',
      border: '5px solid #EE8822'
    }
    return (
      <div className='container' style={{position: 'fixed', height: '100%', width: '100%', padding: '0'}}>
        <button className='button' style={buttonStyle}>
        </button>
        <div className='body' style={bodyStyle}>
          <div className='viewer' style={viewerStyle}>
            <Viewer />
          </div>
          <div className='gallery' style={{ height: '50%', backgroundColor: '#3566CC' }}>
            <img src={require('./images/rhino-legocar.png')} alt="Rhino Lego" style={{ width:"400", height:"260", marginLeft:'25%', marginTop:'8%'}} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
