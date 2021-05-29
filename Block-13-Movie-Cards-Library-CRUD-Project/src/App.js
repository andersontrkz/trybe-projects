import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { MovieList, NotFound, MovieDetails, NewMovie, EditMovie } from './pages/index';

function App() {
  return (
    <section>
      <div>Movie Card Library CRUD</div>

      <Router>
        <Switch>
          <Route exact path="/movies/new" component={ NewMovie } />
          <Route
            exact
            path="/movies/:id"
            render={ (reactRouterProps) => (
              <MovieDetails { ...reactRouterProps } />
            ) }
          />
          <Route
            exact
            path="/movies/:id/edit"
            render={ (reactRouterProps) => (
              <EditMovie { ...reactRouterProps } />
            ) }
          />
          <Route exact path="/" component={ MovieList } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </Router>
    </section>
  );
}

export default App;
