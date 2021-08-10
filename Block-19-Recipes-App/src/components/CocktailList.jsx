import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import Context from '../context/Context';
import ItemCard from './ItemCard';

import '../styles/item-card.css';

export default function CocktailList() {
  const [showCocktails, setShowCocktails] = useState(false);
  const {
    ingredients,
    cocktailsRecipes,
    resquestCocktailsApi,
    selectedCategory,
  } = useContext(Context);
  const history = useHistory();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setShowCocktails(true);
    }
  }, [cocktailsRecipes]);

  useEffect(() => {
    resquestCocktailsApi(ingredients);
  }, []);

  const renderCards = () => {
    if (selectedCategory === 'All' && cocktailsRecipes && cocktailsRecipes.length === 1) {
      return history.push(`/bebidas/${cocktailsRecipes[0].idDrink} `);
    }

    if (cocktailsRecipes && cocktailsRecipes.length) {
      const NUMBER = 12;
      return cocktailsRecipes.map((item, index) => {
        if (index < NUMBER) {
          return (<ItemCard key={ index } item={ item } i={ index } />);
        }
        return null;
      });
    }

    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return null;
  };

  return (
    <Container bsPrefix="flex container">
      { showCocktails ? renderCards() : <Spinner animation="border" /> }
    </Container>
  );
}
