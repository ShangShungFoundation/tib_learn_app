import React, { Component } from 'react';
import './App.css';
import Sentence from './Sentence.js'
import Search from './Search.js'


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Tibetan Learning App</h1>

        <Search />
        <hr/>
        <Sentence />

        <footer>
          <p>Developed at  &nbsp;
            <a href="https://github.com/ShangShungFoundation/1st_merigar_hackathon">1st Merigar Hackathon 2017</a>
            &nbsp;
            organized by Shang Shung Foundation 
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
