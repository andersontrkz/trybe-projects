import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExpenseForm extends Component {
  generateSelects() {
    const { generateCurrencySelect, handleChangeExpense } = this.props;

    return (
      <>
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency"
            onChange={ ({ target }) => handleChangeExpense(target) }
          >
            { generateCurrencySelect() }
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento:
          <select
            data-testid="method-input"
            id="method"
            onChange={ ({ target }) => handleChangeExpense(target) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            data-testid="tag-input"
            id="tag"
            onChange={ ({ target }) => handleChangeExpense(target) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </>
    );
  }

  generateForm() {
    const { handleChangeExpense } = this.props;

    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            type="text"
            data-testid="value-input"
            onChange={ ({ target }) => handleChangeExpense(target) }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            type="text"
            data-testid="description-input"
            onChange={ ({ target }) => handleChangeExpense(target) }
          />
        </label>
        { this.generateSelects() }
      </form>
    );
  }

  render() {
    return (
      this.generateForm()
    );
  }
}

ExpenseForm.propTypes = {
  expenseToEdit: PropTypes.object,
  generateCurrencySelect: PropTypes.func,
  handleChangeExpense: PropTypes.func,
}.isRequired;

export default ExpenseForm;
