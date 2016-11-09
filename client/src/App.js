import React, { Component } from 'react';
import Jumbotron from './Jumbotron';
import Footer from './Footer';
import Gallery from './Gallery';
import './App.css';
import 'font-awesome/css/font-awesome.css';

class App extends Component {
  render() {
    return (
      <div>
        <Jumbotron />

        <Gallery />

        <Footer />
      </div>
    );
  }
}

export default App;
