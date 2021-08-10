import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import ShareButton from './Details/ShareButton';
import FavoriteButton from './Details/FavoriteButton';

// *SOURCE* Semantic Value = https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-interactions.md

export default function DescriptionRecipeCard(
  { recipe, index, updateCards, setUpdateCards, page },
) {
  const history = useHistory();

  const generateMealOrDrinkTitle = () => {
    switch (recipe.type) {
    case 'comida':
      return (
        <h5>
          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${recipe.area} - ${recipe.category}` }
          </span>
        </h5>
      );
    case 'bebida':
      return (
        <h5 data-testid={ `${index}-horizontal-top-text` }>
          {`${recipe.alcoholicOrNot}`}
        </h5>
      );
    default:
      break;
    }
  };

  const handleOpenRecipe = () => {
    const route = `${recipe.type}s/${recipe.id}`;
    history.push(route);
  };

  const generateTags = () => {
    switch (recipe.type) {
    case 'comida':
      return (
        <span>
          {recipe.tags && recipe.tags.reverse().map(
            (tag) => (
              <span
                key={ tag }
                className="recipe-tag"
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </span>
            ),
          )}
        </span>
      );
    default:
      break;
    }
  };

  const generateActionButtons = () => {
    switch (page) {
    case 'favorites':
      return (
        <td>
          <ShareButton
            index={ index }
            id={ recipe.id }
            type={ recipe.type }
          />
          <FavoriteButton
            updateCards={ updateCards }
            setUpdateCards={ setUpdateCards }
            dataTestId={ `${index}-horizontal-favorite-btn` }
            recipe={ recipe }
          />
        </td>
      );
    case 'mades':
      return (
        <td>
          <span data-testid={ `${index}-horizontal-done-date` }>
            Feita em:
            {' '}
            {recipe.doneDate}
          </span>
          <br />
          { generateTags() }
          <ShareButton
            index={ index }
            id={ recipe.id }
            type={ recipe.type }
            updateCards={ updateCards }
            setUpdateCards={ setUpdateCards }
          />
        </td>
      );
    default:
      break;
    }
  };

  const generateFavoriteTable = () => (
    <table>
      <tbody>
        <tr>
          <td rowSpan="4">
            <img
              role="presentation"
              onClick={ handleOpenRecipe }
              data-testid={ `${index}-horizontal-image` }
              alt={ recipe.name }
              width="140"
              src={ recipe.image }
            />
          </td>
        </tr>
        <tr>
          <td>{ generateMealOrDrinkTitle() }</td>
        </tr>
        <tr>
          <td>
            <h5
              role="presentation"
              onClick={ handleOpenRecipe }
              data-testid={ `${index}-horizontal-name` }
            >
              { recipe.name }
            </h5>
          </td>
        </tr>
        <tr>{ generateActionButtons() }</tr>
      </tbody>
    </table>
  );

  return (
    <Card>
      { generateFavoriteTable() }
    </Card>
  );
}

DescriptionRecipeCard.propTypes = {
  favorite: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    area: PropTypes.string,
    type: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }),
  updateCards: PropTypes.bool,
  setUpdateCards: PropTypes.func,
  index: PropTypes.number,
}.isRequired;
