import React from 'react';
import { Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Recommendation({ recommendations }) {
  return (
    <div>
      <Carousel>
        { recommendations.map((recommendation, index) => (
          <Carousel.Item
            key={ recommendation.strMeal || recommendation.strDrink }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              className="d-block w-100"
              src={ recommendation.strMealThumb || recommendation.strDrinkThumb }
              alt={ recommendation.strMeal || recommendation.strDrink }
              data-testid={ `${index}-card-img` }
            />

            <Carousel.Caption>
              <p>
                {recommendation.strAlcoholic || recommendation.strCategory}
              </p>
              <p data-testid={ `${index}-recomendation-title` }>
                { recommendation.strMeal || recommendation.strDrink }
              </p>
            </Carousel.Caption>

          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

Recommendation.propTypes = {
  recommendation: PropTypes.array,
}.isRequired;
