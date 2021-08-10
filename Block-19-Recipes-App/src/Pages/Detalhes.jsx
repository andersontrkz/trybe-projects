import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Container, Button, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Thumb from '../components/Details/Thumb';
import Title from '../components/Details/Title';
import Ingredients from '../components/Details/Ingredients';
import Instructions from '../components/Details/Instructions';
import Video from '../components/Details/Video';
import Recommendation from '../components/Recommendation';

export default function DetalhesComida({ location }) {
  const {
    currentRecipe, storeCurrentRecipe, curr, resquestMealsApi,
    resquestCocktailsApi, recommendations,
  } = useContext(Context);
  const {
    id, name, category, alcoholicOrNot, instructions, image, video, ingredients,
  } = currentRecipe;
  const history = useHistory();
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    storeCurrentRecipe(location.pathname.split('/')[2]);
  }, []);

  const renderInProgressPage = () => {
    if (video) {
      history.push(`/comidas/${id}/in-progress`);
    } else {
      history.push(`/bebidas/${id}/in-progress`);
    }
  };

  const continueRecipeText = () => {
    if (inProgress && inProgress[curr] && inProgress[curr][currentRecipe.id]) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    switch (curr) {
    case 'meals':
      resquestCocktailsApi();

      break;
    case 'cocktails':

      resquestMealsApi();

      break;

    default:
      break;
    }
  }, [curr]);

  return (
    image ? (
      <Container>
        <Thumb title={ name } thumb={ image } />
        <Title
          currentRecipe={ currentRecipe }
          id={ id }
          title={ name }
          subtitle={ !alcoholicOrNot ? category : alcoholicOrNot }
        />
        <Ingredients ingredients={ ingredients } />
        <Instructions instructions={ instructions } />
        { video && <Video video={ video } /> }
        <Recommendation recommendations={ recommendations } />
        <br />
        <br />
        <Button
          className="button-fixed"
          onClick={ () => renderInProgressPage() }
          data-testid="start-recipe-btn"
          variant="warning"
          block
        >
          { continueRecipeText() ? 'Continuar Receita' : 'Iniciar Receita' }
        </Button>
      </Container>
    ) : <Spinner variant="danger" animation="border" />
  );
}

DetalhesComida.propTypes = {
  location: PropTypes.shape,
}.isRequired;
