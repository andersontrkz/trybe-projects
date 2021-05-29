import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  test('Se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    const { name } = pokemons[0];
    const { getByText, getByRole } = renderWithRouter(<App />);
    const pokemonDetails = getByText(/More details/i);
    userEvent.click(pokemonDetails);

    const pokemonHeading = getByText(`${name} Details`);
    expect(pokemonHeading).toBeInTheDocument();

    const pokemonName = getByText(name);
    expect(pokemonName).toBeInTheDocument();

    const summaryHeading = getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summaryHeading).toBeInTheDocument();

    const paragraphText = 'This intelligent Pokémon'
      + ' roasts hard berries with electricity to make them tender enough to eat.';
    const paragraph = getByText(paragraphText);
    expect(paragraph).toBeInTheDocument();
  });

  test('Se existe na página uma seção com os mapas', () => {
    const { name, foundAt } = pokemons[0];
    const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);
    const pokemonDetails = getByText(/More details/i);
    userEvent.click(pokemonDetails);

    const locationsHeading = getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    });
    expect(locationsHeading).toBeInTheDocument();

    const pokemonLocations = getAllByRole('img');
    expect(pokemonLocations[1]).toHaveAttribute('src', foundAt[0].map);
    expect(pokemonLocations[1]).toHaveAttribute('alt', `${name} location`);
    expect(pokemonLocations[2]).toHaveAttribute('src', foundAt[1].map);
    expect(pokemonLocations[2]).toHaveAttribute('alt', `${name} location`);
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const { getByText, getByLabelText, getByRole } = renderWithRouter(<App />);
    const pokemonDetails = getByText(/More details/i);
    userEvent.click(pokemonDetails);

    const favoriteLabel = getByLabelText('Pokémon favoritado?');
    expect(favoriteLabel).toBeInTheDocument();
    userEvent.click(favoriteLabel);

    const favoriteCheckbox = getByRole('checkbox');
    expect(favoriteCheckbox.checked).toEqual(true);

    userEvent.click(favoriteLabel);
    expect(favoriteCheckbox.checked).toEqual(false);

    userEvent.click(favoriteLabel);
    expect(favoriteCheckbox.checked).toEqual(true);
  });
});
