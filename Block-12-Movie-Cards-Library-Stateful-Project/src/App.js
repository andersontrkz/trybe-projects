import React, { Component } from 'react';
import Header from './components/Header';
import './App.css';
import MovieLibary from './components/MovieLibrary';
import movies from './data';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MovieLibary movies={ movies } />
      </div>
    );
  }
}

export default App;
