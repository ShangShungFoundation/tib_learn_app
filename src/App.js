import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sentence from './Sentence.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sentence/>
      </div>
    );
  }
}

export default App;
