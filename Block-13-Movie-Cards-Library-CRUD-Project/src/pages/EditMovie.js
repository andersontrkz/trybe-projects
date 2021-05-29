import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Loading, MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      movie: {},
      shouldRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    movieAPI.getMovie(id).then((movie) => {
      this.setState({ movie, status: 'ok' });
    });
  }

  async handleSubmit(updatedMovie) {
    this.setState({ status: 'loading' });
    await movieAPI.updateMovie(updatedMovie);
    this.setState({
      status: 'ok',
      shouldRedirect: true,
    });
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;

    if (shouldRedirect) {
      return (<Redirect to="/" />);
    }

    if (status === 'loading') {
      return (<Loading />);
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

EditMovie.propTypes = ({
  match: PropTypes.object,
}).isRequired;

export default EditMovie;
