import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Loading } from '../components';
import * as movieAPI from '../services/movieAPI';

class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      movie: '',
      loading: true,
    };

    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  componentDidMount() {
    // console.log(this.props)
    const { match } = this.props;

    movieAPI.getMovie(match.params.id).then((movie) => {
      this.setState({ movie, loading: false });
    });
  }

  async handleClickDelete() {
    const { movie } = this.state;
    this.setState({ loading: false });
    await movieAPI.deleteMovie(movie.id);
  }

  render() {
    const { loading, movie } = this.state;
    const { id, title, storyline, imagePath, genre, rating, subtitle } = movie;

    if (loading) return (<Loading />);

    return (
      <div data-testid="movie-details" className="movie-details">
        <img alt="Movie Cover" src={ `../${imagePath}` } className="movie-details-img" />
        <p>{ `Title: ${title}` }</p>
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        <Link to="/">VOLTAR</Link>
        <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
        <Link to="/" onClick={ this.handleClickDelete }>DELETAR</Link>
      </div>
    );
  }
}

MovieDetails.propTypes = ({
  match: PropTypes.object,
}).isRequired;

export default MovieDetails;
