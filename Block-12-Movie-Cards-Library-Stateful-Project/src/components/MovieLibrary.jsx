import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import AddMovie from './AddMovie';

class MovieLibary extends Component {
  constructor(props) {
    super(props);

    this.addMovie = this.addMovie.bind(this);
    this.onBookmarkedChange = this.onBookmarkedChange.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onSelectedGenreChange = this.onSelectedGenreChange.bind(this);

    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies: props.movies,
    };
  }

  onSelectedGenreChange({ target: { value } }) {
    this.setState({ selectedGenre: value });
  }

  onSearchTextChange({ target: { value } }) {
    this.setState({ searchText: value });
  }

  onBookmarkedChange({ target: { checked } }) {
    this.setState({ bookmarkedOnly: checked });
  }

  addMovie(movie) {
    const { movies } = this.state;
    this.setState({ movies: [...movies, movie] });
  }

  render() {
    const { movies, bookmarkedOnly, searchText, selectedGenre } = this.state;
    const filteredFavoriteMovies = movies.filter(({ bookmarked }) => {
      if (!bookmarkedOnly) {
        return true;
      }

      if (bookmarked === bookmarkedOnly) {
        return true;
      }

      return false;
    });

    const filteredGenreMovies = filteredFavoriteMovies.filter(({ genre }) => {
      if (!selectedGenre) {
        return genre;
      }

      return genre === selectedGenre;
    });

    const filteredMovies = filteredGenreMovies.filter(
      ({ title, subtitle, storyline }) => (
        title.toLowerCase().includes(searchText.toLowerCase())
        || subtitle.toLowerCase().includes(searchText.toLowerCase())
        || storyline.toLowerCase().includes(searchText.toLowerCase())
      ),
    );

    return (
      <section>
        <SearchBar
          onChange={ this.onBookmarkedChange }
          onSearchTextChange={ this.onSearchTextChange }
          onBookmarkedChange={ this.onBookmarkedChange }
          onSelectedGenreChange={ this.onSelectedGenreChange }
        />
        <MovieList movies={ filteredMovies } />
        <AddMovie onClick={ this.addMovie } movies={ movies } />
      </section>
    );
  }
}

MovieLibary.propTypes = ({
  movies: PropTypes.array,
}).isRequired;

export default MovieLibary;
