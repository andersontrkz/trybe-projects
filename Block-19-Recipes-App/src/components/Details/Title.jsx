import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

export default function Title({ currentRecipe, subtitle }) {
  const { id, type, name } = currentRecipe;

  return (
    <Container>
      <section>
        <strong data-testid="recipe-title">{ name }</strong>
      </section>
      <section>
        <i data-testid="recipe-category">{ subtitle }</i>
      </section>
      <section>
        <ShareButton id={ id } type={ type } />
        <Container>
          <FavoriteButton
            dataTestId="favorite-btn"
            recipe={ currentRecipe }
          />
        </Container>
      </section>
      <br />
    </Container>
  );
}

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}.isRequired;
