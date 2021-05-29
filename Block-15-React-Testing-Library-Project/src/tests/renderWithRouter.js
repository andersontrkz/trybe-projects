import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

const renderWithRouter = (componentToRender, _route) => {
  const history = createMemoryHistory();

  const renderObject = { ...render(
    <Router history={ history }>
      { componentToRender }
    </Router>,
  ),
  history,
  };

  if (_route) {
    renderObject.history.push(_route);
  }

  return renderObject;
};

export default renderWithRouter;
