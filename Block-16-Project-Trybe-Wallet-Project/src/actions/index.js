export const setLogin = (email) => ({
  type: 'SET_EMAIL',
  payload: email,
});

export const addExpense = (expense) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();

  delete data.USDT;
  expense.exchangeRates = data;

  dispatch({
    type: 'ADD_EXPENSE',
    payload: expense,
  });
};

export function deleteExpense(id) {
  return {
    type: 'DELETE_EXPENSE',
    payload: id,
  };
}

export function setEditState(expenseId) {
  return {
    type: 'SET_EDIT_STATE',
    payload: expenseId,
  };
}

export function saveEditedExpense(expense) {
  return {
    type: 'SAVE_EDITED_EXPENSE',
    payload: expense,
  };
}

export function saveEditExpense(expense) {
  return {
    type: 'EDIT_EXPENSE',
    payload: expense,
  };
}

export function requestApi() {
  return {
    type: 'REQUEST_API',
  };
}

export function requestCurrencies(data) {
  return {
    type: 'REQUEST_CURRENCIES',
    data,
  };
}

export function fetchApi() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();

    dispatch(requestApi());
    dispatch(requestCurrencies(data));
  };
}
