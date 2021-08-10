import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, Container } from 'react-bootstrap';
import Context from '../context/Context';

import '../styles/categories.css';
import CategoryButton from './CategoryButton';

export default function CategoryFilter({ type }) {
  const [categories, setCategories] = useState([]);

  const {
    requestMealCategories,
    mealsCategories,
    requestCocktailsCategories,
    cocktailsCategories,
  } = useContext(Context);

  const checkType = async () => {
    if (type === 'meals') {
      await requestMealCategories();
    }
    if (type === 'drinks') {
      await requestCocktailsCategories();
    }
  };

  useEffect(() => {
    checkType();
  }, []);

  useEffect(() => {
    setCategories([...mealsCategories]);
  }, [mealsCategories]);

  useEffect(() => {
    setCategories([...cocktailsCategories]);
  }, [cocktailsCategories]);

  return (
    <Container>
      <ButtonToolbar bsPrefix="categories-list">
        <CategoryButton
          text="All"
        />
        { categories.map((cat, index) => {
          const five = 5;
          if (index < five) {
            return (
              <CategoryButton
                type={ type }
                key={ index }
                text={ cat.strCategory }
              />);
          }
          return null;
        }) }
      </ButtonToolbar>
    </Container>
  );
}

CategoryFilter.propTypes = {
  type: PropTypes.string,
}.isRequired;
