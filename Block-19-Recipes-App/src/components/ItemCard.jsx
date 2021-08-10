import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Context from '../context/Context';

import '../styles/item-card.css';

export default function ItemCard({ item, i }) {
  const [str, setStr] = useState('');
  const [thumb, setThumb] = useState('');
  const history = useHistory();
  const { storeCurrentRecipe } = useContext(Context);

  const { idMeal, strMeal, strMealThumb, idDrink, strDrink, strDrinkThumb } = item;

  useEffect(() => {
    if (!strMeal && !strMealThumb) {
      setStr(strDrink);
      setThumb(strDrinkThumb);
    }
    if (!strDrink && !strDrinkThumb) {
      setStr(strMeal);
      setThumb(strMealThumb);
    }
  }, [str, strDrink, strDrinkThumb, strMeal, strMealThumb, thumb]);

  const renderDetailPage = () => {
    if (idMeal) {
      storeCurrentRecipe(idMeal);
      history.push(`/comidas/${idMeal}`);
    }

    if (idDrink) {
      storeCurrentRecipe(idDrink);
      history.push(`/bebidas/${idDrink}`);
    }
  };

  return (
    <Card
      bsPrefix="item card"
      data-testid={ `${i}-recipe-card` }
      onClick={ () => renderDetailPage() }
    >
      <Card.Img variant="top" src={ thumb } data-testid={ `${i}-card-img` } />
      <Card.Body>
        <Card.Title data-testid={ `${i}-card-name` }>{ str }</Card.Title>
      </Card.Body>
    </Card>
  );
}

ItemCard.propTypes = {
  i: PropTypes.number.isRequired,
  item: PropTypes.shape({
    idMeal: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    idDrink: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};
