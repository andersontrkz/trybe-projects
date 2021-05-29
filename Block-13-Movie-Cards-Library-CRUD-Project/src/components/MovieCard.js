import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    const { id, title, subtitle, storyline, rating, imagePath, genre } = movie;

    return (
      <div data-testid="movie-card" className="movie-card">
        <header>
          <img className="movie-card-image" src={ imagePath } alt={ `Movie ${title}` } />
        </header>
        <main className="movie-card-main">
          <p className="movie-card-title">{title}</p>
          <p>{subtitle}</p>
          <p>{storyline}</p>
          <p>{genre}</p>
          <p>{rating}</p>
        </main>
        <footer className="movie-card-footer">
          <Link to={ `movies/${id}` }>VER DETALHES</Link>
        </footer>
      </div>
    );
  }
}

MovieCard.propTypes = ({
  title: PropTypes.string,
  subtitle: PropTypes.string,
  storyline: PropTypes.string,
  rating: PropTypes.number,
  imagePath: PropTypes.string,
  genre: PropTypes.string,
}).isRequired;

export default MovieCard;
