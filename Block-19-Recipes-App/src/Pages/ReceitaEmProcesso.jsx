import React, { useContext, useEffect, useState } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Thumb from '../components/Details/Thumb';
import Title from '../components/Details/Title';
import IngredientsStep from '../components/Details/IngredientsStep';
import Instructions from '../components/Details/Instructions';
import useLocalStorage from '../hooks/useLocalStorage';
import localStorageAction from '../helpers/localStorageAction';

export default function ReceitaEmProcesso({ location }) {
  const allDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes', []);
  const { currentRecipe, storeCurrentRecipe } = useContext(Context);
  const {
    id, name, category, alcoholicOrNot, instructions, image,
    ingredients, area, type, tags } = currentRecipe;
  const [allStepsOk, setAllStepsOk] = useState(true);
  const history = useHistory();

  useEffect(() => {

  }, [doneRecipes]);

  useEffect(() => {
    storeCurrentRecipe(location.pathname.split('/')[2]);
  }, []);

  // Atualiza o estatus de progresso, para habilitar o botão
  const stepsProgress = (steps) => {
    const completeSteps = [];

    if (ingredients && steps) {
      for (let index = 0; index < ingredients.length; index += 1) {
        completeSteps.push(steps[index].checked);
      }
    }

    setAllStepsOk(completeSteps.some((step) => step === false));
  };

  const actualDate = () => {
    // *SOURCE* https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const doneRecipe = async () => {
    const recipe = {
      id,
      type,
      area,
      category,
      alcoholicOrNot,
      name,
      image,
      doneDate: actualDate(),
      tags,
    };
    await setDoneRecipes(await localStorageAction(recipe, 'addOnce', allDoneRecipes));
    history.push('/receitas-feitas');
  };

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
        <IngredientsStep
          currentRecipe={ currentRecipe }
          ingredients={ ingredients }
          stepsProgress={ stepsProgress }
        />
        <Instructions instructions={ instructions } />
        <Button
          onClick={ () => doneRecipe() }
          disabled={ allStepsOk }
          data-testid="finish-recipe-btn"
          variant="warning"
          block
        >
          Finalizar Receita
        </Button>
      </Container>
    ) : <Spinner variant="success" animation="border" />
  );
}

ReceitaEmProcesso.propTypes = {
  location: PropTypes.shape,
}.isRequired;
