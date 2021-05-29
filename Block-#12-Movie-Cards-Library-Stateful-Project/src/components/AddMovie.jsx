// implement AddMovie component here
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddMovie extends Component {
  constructor(props) {
    super(props);

    this.handleChangeSetState = this.handleChangeSetState.bind(this);
    this.handleSubmitAddMovie = this.handleSubmitAddMovie.bind(this);

    this.state = {
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    };
  }

  handleChangeSetState({ target: { value, name } }) {
    this.setState((oldState) => ({ ...oldState, [name]: value }));
  }

  handleSubmitAddMovie(event) {
    event.preventDefault();
    const { title, subtitle, imagePath, storyline, rating, genre } = this.state;
    const { onClick } = this.props;

    onClick({ title, subtitle, imagePath, storyline, rating, genre });

    this.setState(() => ({
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    }
    ));
  }

  generateMovieInputForm = (type, dataTestId, name, value) => (
    <input
      type={ type }
      data-testid={ dataTestId }
      id={ name }
      name={ name }
      value={ value }
      onChange={ this.handleChangeSetState }
    />
  )

  generateMovieTextareaForm = (dataTestId, name, value) => (
    <input
      data-testid={ dataTestId }
      id={ name }
      name={ name }
      value={ value }
      onChange={ this.handleChangeSetState }
    />
  )

  render() {
    const { title, subtitle, imagePath, storyline, rating, genre } = this.state;
    const submitMovie = this.handleSubmitAddMovie;
    return (
      <form data-testid="add-movie-form">
        <label htmlFor="title-input" data-testid="title-input-label">
          Título
          { this.generateMovieInputForm('text', 'title-input', 'title', title) }
        </label>

        <label htmlFor="subtitle-input" data-testid="subtitle-input-label">
          Subtítulo
          { this.generateMovieInputForm('text', 'subtitle-input', 'subtitle', subtitle) }
        </label>

        <label htmlFor="image-input" data-testid="image-input-label">
          Imagem
          { this.generateMovieInputForm('text', 'image-input', 'imagePath', imagePath) }
        </label>

        <label htmlFor="storyline-input" data-testid="storyline-input-label">
          Sinopse
          { this.generateMovieTextareaForm('storyline-input', 'storyline', storyline) }
        </label>

        <label htmlFor="rating-input" data-testid="rating-input-label">
          Avaliação
          { this.generateMovieInputForm('number', 'rating-input', 'rating', rating) }
        </label>

        <label htmlFor="genre-input" data-testid="genre-input-label">
          Gênero
          <select
            name="genre"
            value={ genre }
            id="genre-input"
            data-testid="genre-input"
            onChange={ this.handleChangeSetState }
          >
            <option value="action" data-testid="genre-option">Ação</option>
            <option value="comedy" data-testid="genre-option">Comédia</option>
            <option value="thriller" data-testid="genre-option">Suspense</option>
          </select>
        </label>
        <button type="submit" onClick={ submitMovie } data-testid="send-button">
          Adicionar filme
        </button>
      </form>
    );
  }
}

AddMovie.propTypes = ({
  title: PropTypes.string,
  subtitle: PropTypes.string,
  imagePath: PropTypes.string,
  storyline: PropTypes.string,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  genre: PropTypes.string,
}).isRequired;

export default AddMovie;
