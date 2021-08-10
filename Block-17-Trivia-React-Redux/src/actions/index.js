export const playerData = (state) => ({
  type: 'LOGIN',
  state,
});

export const questionsData = (state) => ({
  type: 'QUEST',
  state,
});

export const playerScore = (state) => ({
  type: 'SET_SCORE',
  state,
});
