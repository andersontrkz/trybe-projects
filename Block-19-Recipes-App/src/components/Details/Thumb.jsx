import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Thumb({ title, thumb }) {
  return (
    <Container>
      <img data-testid="recipe-photo" width="100%" alt={ title } src={ `${thumb}` } />
    </Container>
  );
}

Thumb.propTypes = {
  title: PropTypes.string,
  thumb: PropTypes.string,
}.isRequired;
