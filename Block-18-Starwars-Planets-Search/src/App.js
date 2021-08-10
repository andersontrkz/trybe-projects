import React from 'react';
import './App.css';

import Home from './components/Home';
import PlanetProvider from './context/PlanetProvider';

function App() {
  return (
    <PlanetProvider>
      <Home />
    </PlanetProvider>
  );
}

export default App;
