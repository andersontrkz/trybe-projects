const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

export default (state = INITIAL_STATE, action) => {
  const localStorageRanking = localStorage.getItem('ranking');

  let player = {
    score: 0,
    assertions: 0,
  };

  switch (action.type) {
  case 'LOGIN':
    if (!localStorageRanking) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }

    localStorage.setItem('state', JSON.stringify({ player }));
    return {
      ...state,
      name: action.state.name,
      gravatarEmail: action.state.gravatarEmail,
      score: 0,
    };
  case 'SET_SCORE':
    player = {
      score: action.state.score,
      assertions: action.state.assertions,
    };
    localStorage.setItem('state', JSON.stringify({ player }));
    return {
      ...state,
      score: action.state.score,
      assertions: action.state.assertions,
    };
  default:
    return state;
  }
};
