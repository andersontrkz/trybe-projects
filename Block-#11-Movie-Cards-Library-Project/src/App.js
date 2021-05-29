import React from 'react';
import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';
import movies from './data';

function App() {
  return (
    <body>
      <div className="App">
        <Header />
        <MovieList movies={ movies } />
      </div>
    </body>
  );
}

export default App;
