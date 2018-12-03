import React, { Component } from 'react';
// import Board from './components/Board';
import Game from './components/Game'
import './App.css';

class App extends Component {
  render() {
    return (
      
      <div className="App">
      <link href="https://unpkg.com/nes.css/css/nes.min.css" rel="stylesheet" />
        {/* <Board /> */}
        <Game className="App" />
      </div>
    );
  }
}

export default App;
