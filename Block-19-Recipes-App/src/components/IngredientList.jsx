import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Spinner } from 'react-bootstrap';
import Context from '../context/Context';
import IngredientCard from './IngredientCard';

import '../styles/item-card.css';

export default function IngredientList({ type }) {
  const [showMeals, setShowMeals] = useState(false);
  const { ingredients, getIngredients } = useContext(Context);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setShowMeals(true);
    }
  }, [ingredients]);

  useEffect(() => {
    getIngredients(type);
  }, []);

  const renderCards = () => (
    ingredients.map((item, index) => (
      <IngredientCard
        key={ index }
        item={ item }
        i={ index }
      />))
  );

  return (
    <Container bsPrefix="flex container">
      { showMeals ? renderCards() : <Spinner animation="border" /> }
    </Container>
  );
}

IngredientList.propTypes = {
  type: PropTypes.string.isRequired,
};
