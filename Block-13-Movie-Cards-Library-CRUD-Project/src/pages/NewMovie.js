import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Loading } from '../components';
import MovieForm from '../components/MovieForm';
import * as movieAPI from '../services/movieAPI';

class NewMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      shouldRedirect: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(newMovie) {
    this.setState({ loading: true });
    await movieAPI.createMovie(newMovie);
    this.setState({ loading: false, shouldRedirect: true });
  }

  render() {
    const { loading, shouldRedirect } = this.state;

    if (shouldRedirect) return (<Redirect to="/" />);

    if (loading) return (<Loading />);

    return (
      <div data-testid="new-movie">
        <MovieForm onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}
export default NewMovie;
