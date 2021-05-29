import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <NotFound.js />', () => {
  test('Se página contém um heading h2 com o texto Page requested not found 😭;', () => {
    const { getByRole } = renderWithRouter(<App />, '/rota-inexistente');

    const notFoundHeading = getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(notFoundHeading).toBeInTheDocument();
  });

  test('Se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getAllByRole } = renderWithRouter(<App />, '/rota-inexistente');

    const notFoundImage = getAllByRole('img', {})[1];
    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
