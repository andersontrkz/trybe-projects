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
  const { setSelectedIngredient } = useContext(Context);

  const { strIngredient, strIngredient1 } = item;

  useEffect(() => {
    if (!strIngredient) {
      setStr(strIngredient1);
      const url = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;
      setThumb(url);
    }
    if (!strIngredient1) {
      setStr(strIngredient);
      const url = `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`;
      setThumb(url);
    }
  }, [strIngredient, strIngredient1]);

  const filterByIngredient = () => {
    if (strIngredient) {
      setSelectedIngredient(strIngredient);
      history.push('/comidas');
    }

    if (strIngredient1) {
      setSelectedIngredient(strIngredient1);
      history.push('/bebidas');
    }
  };

  return (
    <Card
      bsPrefix="item card"
      data-testid={ `${i}-ingredient-card` }
      onClick={ () => filterByIngredient() }
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
    strIngredient: PropTypes.string,
    strIngredient1: PropTypes.string,
  }).isRequired,
};
