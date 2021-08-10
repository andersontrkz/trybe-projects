import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route exact path="/carteira">
        <Wallet />
      </Route>
      <Route exact path="/">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
