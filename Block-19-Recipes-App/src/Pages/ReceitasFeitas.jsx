import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import DescriptionRecipeCard from '../components/DescriptionRecipeCard';
import Header from '../components/Header';

export default function ReceitasFeitas() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [updateCards, setUpdateCards] = useState(false);

  return (
    <Container>
      <Header title="Receitas Feitas" />
      {
        doneRecipes && doneRecipes.map((recipe, index) => (
          <DescriptionRecipeCard
            updateCards={ updateCards }
            setUpdateCards={ setUpdateCards }
            key={ recipe.id }
            index={ index }
            recipe={ recipe }
            page="mades"
          />
        ))
      }
    </Container>
  );
}
