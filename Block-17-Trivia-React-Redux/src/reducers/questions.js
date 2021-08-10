const INITIAL_STATE = {
  questions: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'QUEST':
    return {
      ...state,
      questions: action.state,
    };
  default:
    return state;
  }
};
