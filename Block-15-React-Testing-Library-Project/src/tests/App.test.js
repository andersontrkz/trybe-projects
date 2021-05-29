import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

//  *SOURCE* https://testing-library.com/docs/queries/byrole

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Requisito 01 - Testar o componente App.js', () => {
  test('Se o primeiro link deve possuir o texto Home.', () => {
    const { getByRole } = renderWithRouter(<App />);

    const linkHome = getByRole('link', {
      name: 'Home',
    });

    expect(linkHome).toBeInTheDocument();
  });

  test('Se o segundo link deve possuir o texto About.', () => {
    const { getByRole } = renderWithRouter(<App />);

    const linkAbout = getByRole('link', {
      name: 'About',
    });

    expect(linkAbout).toBeInTheDocument();
  });

  test('Se o terceiro link deve possuir o texto Favorite Pokémons.', () => {
    const { getByRole } = renderWithRouter(<App />);

    const linkFavorites = getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(linkFavorites).toBeInTheDocument();
  });
});
