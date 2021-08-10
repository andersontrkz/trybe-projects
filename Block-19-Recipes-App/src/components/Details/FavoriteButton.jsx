import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Image } from 'react-bootstrap';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import useLocalStorage from '../../hooks/useLocalStorage';
import localStorageAction from '../../helpers/localStorageAction';

export default function FavoriteButton(
  { recipe, dataTestId, updateCards, setUpdateCards },
) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);

  const updateFavoriteState = () => {
    const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const exist = allFavorites.find(({ id: idFavorito }) => idFavorito === recipe.id);
    if (exist) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    updateFavoriteState();
  });

  useEffect(() => {
  }, [favoriteRecipes]);

  // Gera o objeto que será adicionado no localstorage
  const generateLocalStorageObject = (type) => {
    const { id, category, alcoholicOrNot, name, area, image } = recipe;

    switch (type) {
    case 'comida':
      return {
        id, type, area, category, alcoholicOrNot: '', name, image,
      };
    case 'bebida':
      return {
        id, type, area: '', category, alcoholicOrNot, name, image,
      };
    default:
      return {};
    }
  };

  // Atualiza o localStorage
  const updateFavoritesLocalStorage = async () => {
    const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { type } = recipe;
    const newFavorite = generateLocalStorageObject(type);
    const action = await localStorageAction(newFavorite, 'addToggle', allFavorites);
    await setFavoriteRecipes(action);
    if (setUpdateCards) {
      setUpdateCards(!updateCards);
    }
  };

  // // Ação ao clicar em favoritar
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    updateFavoritesLocalStorage();
  };

  return (
    <Container>
      <Button
        block
        onClick={ handleFavorite }
        variant="success"
      >
        <Image
          data-testid={ dataTestId }
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        />
      </Button>
    </Container>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    area: PropTypes.string,
    type: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }),
  dataTestId: PropTypes.string,
  updateCards: PropTypes.bool,
  setUpdateCards: PropTypes.func,
}.isRequired;
