const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loadedPage: false,
  isEditing: false,
  expenseToEdit: {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  },
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const { expenses } = state;
  switch (action.type) {
  case 'ADD_EXPENSE':
    if (action.payload.value === '') return ({ ...state });
    action.payload.id = state.expenses.length;
    return {
      ...state, expenses: [...state.expenses, action.payload],
    };
  case 'DELETE_EXPENSE': {
    const filteredExpenses = expenses.filter((expense) => expense.id !== action.payload);
    return {
      ...state,
      expenses: filteredExpenses,
    };
  }
  case 'SET_EDIT_STATE': {
    const filteredExpense = expenses.find((expense) => expense.id === action.payload);
    return {
      ...state,
      expenseToEdit: filteredExpense,
      isEditing: true,
    };
  }
  case 'SAVE_EDITED_EXPENSE': {
    const indexOfEditedExpense = expenses.indexOf(action.payload);
    const newExpenses = expenses;
    newExpenses[indexOfEditedExpense + 1] = action.payload;
    return {
      ...state,
      expenses: newExpenses,
      isEditing: false,
    };
  }
  case 'REQUEST_API':
    return {
      ...state,
      loadedPage: false,
    };
  case 'REQUEST_CURRENCIES':
    delete action.data.USDT;
    return {
      ...state,
      currencies: action.data,
      loadedPage: true,
    };
  default:
    return state;
  }
};

export default walletReducer;
