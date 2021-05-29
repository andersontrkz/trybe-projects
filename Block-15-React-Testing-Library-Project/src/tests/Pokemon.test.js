import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('6. Teste o componente <Pokemon.js />', () => {
  test('Se é renderizado um card com as informações de determinado pokémon.', () => {
    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemons[0];
    const { getByText, getAllByRole, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);

    const pokemonName = getByText(name);
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = getByText(type);
    expect(pokemonType).toBeInTheDocument();

    const averageWeight = getByText(`Average weight: ${value} ${measurementUnit}`);
    expect(averageWeight).toBeInTheDocument();

    const pokemonImage = getAllByRole('img');
    expect(pokemonImage[0]).toHaveAttribute('src', image);
    expect(pokemonImage[0]).toHaveAttribute('alt', `${name} sprite`);

    const isFavoritePokemon = getByAltText(`${name} is marked as favorite`);
    expect(isFavoritePokemon).toHaveAttribute('src', '/star-icon.svg');
  });

  test('Se o card do Pokémon indicado contém um link com redirecionamento', () => {
    const { id } = pokemons[0];
    const { getByText, history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);

    userEvent.click(getByText(/More details/i));
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  //  *SOURCE* https://testing-library.com/docs/queries/about/
  test('Se o pokemon não é favoritado', () => {
    const { name } = pokemons[0];
    const { queryByText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);

    const isFavoritePokemon = queryByText(`${name} is marked as favorite`);
    expect(isFavoritePokemon).toBeNull();
  });
});
