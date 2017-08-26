import React, { Component } from 'react';
import './App.css';
import Sentence from './Sentence.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Tibetan Learning App</h1>
        
        <Sentence/>

        <footer>
          Developed at  &nbsp;
           <a href="https://shangshungfoundation.github.io/1st_merigar_hackathon/">1st Merigar Hackathon</a>
            &nbsp;
          organized by Shang Shung Foundation 2017
        </footer>
      </div>
    );
  }
}

export default App;
