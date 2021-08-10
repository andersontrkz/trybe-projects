import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Context from '../context/Context';

import '../styles/categories.css';

export default function CategoryButton(props) {
  const {
    setSelectedIngredient,
    selectedCategory,
    setSelectedCategory,
    filterByCategory,
  } = useContext(Context);
  const { text, type } = props;

  const setCategory = () => {
    if (selectedCategory === text) {
      setSelectedIngredient('');
      setSelectedCategory('All');
    }
    if (selectedCategory !== text) {
      setSelectedIngredient('');
      setSelectedCategory(text);
    }
  };

  useEffect(() => { filterByCategory(type); }, [selectedCategory]);

  return (
    <Button
      onClick={ () => setCategory() }
      bsPrefix="btn"
      data-testid={ `${text}-category-filter` }
    >
      { text }
    </Button>
  );
}

CategoryButton.propTypes = {
  value: PropTypes.string,
}.isRequired;
