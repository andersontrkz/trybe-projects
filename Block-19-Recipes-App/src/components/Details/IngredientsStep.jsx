import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Context from '../../context/Context';
import useLocalStorage from '../../hooks/useLocalStorage';
import localStorageAction from '../../helpers/localStorageAction';

export default function IngredientsStep({ ingredients, currentRecipe, stepsProgress }) {
  const [stepsClassName, setStepsClassName] = useState([]);
  const { curr } = useContext(Context);
  const RADIX = 10;
  const steps = [];
  const STRIPE_CLASS = 'step-checked';
  const NOT_STRIPE_CLASS = 'step-not-checked';
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const [progress, setProgress] = useLocalStorage('inProgressRecipes', []);

  useEffect(() => {
  }, [progress]);

  const generateNoClassElements = () => {
    if (ingredients) {
      for (let index = 0; index <= ingredients.length; index += 1) {
        steps.push({
          step: NOT_STRIPE_CLASS,
          checked: false,
          index,
        });
      }
    }
    setStepsClassName(steps);
  };

  const generateWithClassElements = () => {
    const keys = Object.keys(inProgress[curr]);
    const recipe = keys.find((key) => key === currentRecipe.id);
    const arrayIds = inProgress[curr][currentRecipe.id];
    let className = '';
    let classValue = false;

    if (recipe) {
      for (let index = 0; index < ingredients.length; index += 1) {
        for (let index2 = 0; index2 < arrayIds.length; index2 += 1) {
          if (index === (Number.parseInt(arrayIds[index2], RADIX))) {
            className = STRIPE_CLASS;
            classValue = true;
            break;
          } else {
            className = NOT_STRIPE_CLASS;
            classValue = false;
          }
        }
        steps.push({
          step: className,
          checked: classValue,
          index,
        });
      }
      setStepsClassName(steps);
    }
  };

  useEffect(() => {
    if (!inProgress || !inProgress[curr]) {
      generateNoClassElements();
    } else {
      generateWithClassElements();
    }
  }, []);

  // Pupula o estado que gerencia a classe CSS dos ingredientes
  const populateSteps = () => {
    if (inProgress) {
      if (!inProgress[curr]) {
        return;
      }
      const keys = Object.keys(inProgress[curr]);
      const recipe = keys.find((key) => key === currentRecipe.id);

      if (recipe) {
        return;
      }

      if (ingredients) {
        for (let index = 0; index < ingredients.length; index += 1) {
          steps.push({
            step: NOT_STRIPE_CLASS,
            checked: false,
            index,
          });
        }
      }
      setStepsClassName(steps);
    }
  };

  // carrega local storage dos ingredientes
  const loadIngredientesLocalStorage = () => {
    const { id } = currentRecipe;
    switch (!inProgress) {
    case true:
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ [curr]: { [id]: [] } }));
      break;
    default:
      if (!inProgress[curr] || !inProgress[curr][id]) {
        localStorage.setItem('inProgressRecipes', JSON
          .stringify({
            ...inProgress,
            [curr]: { ...inProgress[curr], [id]: [] },
          }));
      } else {
        localStorage.setItem('inProgressRecipes', JSON
          .stringify({
            ...inProgress,
            [curr]:
              { ...inProgress[curr],
                [id]: [...inProgress[curr][id]],
              } })); // dps passar o spread pros ids
      }
    }
  };

  const addOnceLocalStorage = async (array, targetId) => {
    const { id } = currentRecipe;
    const newProgress = await localStorageAction(
      targetId, 'addToggleStep', array[curr][id], { id, curr, array },
    );
    setProgress(newProgress);
  };

  useEffect(() => {
    populateSteps();
    loadIngredientesLocalStorage();
  }, [ingredients]);

  // Adiciona efeito ao clicar em um item da lista de ingredientes
  const doneStepEffect = ({ id: targetId }) => {
    const allProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let step = STRIPE_CLASS;

    if (stepsClassName[targetId].checked) {
      step = NOT_STRIPE_CLASS;
    }

    setStepsClassName([
      ...stepsClassName,
      stepsClassName[targetId].checked = !stepsClassName[targetId].checked,
      stepsClassName[targetId].step = step,
    ]);
    stepsProgress(stepsClassName);
    // adciona no localStorage
    addOnceLocalStorage(allProgress, [targetId][0]);
  };

  return (
    <Container>
      <h4>Ingredientes</h4>
      <table width="100%">
        <tbody>
          {
            stepsClassName.length && ingredients && ingredients.map(
              ({ ingredient, measure }, index) => (
                <tr key={ index } data-testid={ `${index}-ingredient-step` }>
                  <td>
                    {/* {console.log(stepsClassName[index] && stepsClassName[index].checked,
                  'steps ', stepsClassName, ' index ', index, ' ingred ', ingredient)} */}
                    <input
                      checked={ stepsClassName[index] && stepsClassName[index].checked }
                      type="checkbox"
                      id={ `${index}` }
                      value={ `${index}-ingredient` }
                      onChange={ ({ target }) => doneStepEffect(target) }
                    />
                    <label
                      className={ stepsClassName[index] && stepsClassName[index].step }
                      htmlFor={ `${index}` }
                    >
                      {`${ingredient} - ${measure}`}
                    </label>
                  </td>
                </tr>
              ),
            )
          }
        </tbody>
      </table>
      <br />
    </Container>
  );
}

IngredientsStep.propTypes = {
  ingredients: PropTypes.array,
}.isRequired;
