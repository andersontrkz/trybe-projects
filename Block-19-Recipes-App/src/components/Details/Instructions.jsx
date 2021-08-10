import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Instructions({ instructions }) {
  return (
    <Container>
      <h4>Instruções</h4>
      <p align="justify" data-testid="instructions">{ instructions }</p>
      <br />
    </Container>
  );
}

Instructions.propTypes = {
  instructions: PropTypes.string,
}.isRequired;
