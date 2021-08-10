import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ExpenseForm from '../components/ExpenseForm';
import {
  addExpense, deleteExpense, setEditState, saveEditedExpense, fetchApi,
} from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();

    this.generateCurrencySelect = this.generateCurrencySelect.bind(this);
    this.handleChangeExpense = this.handleChangeExpense.bind(this);
    this.loadTotalWalletExpenses = this.loadTotalWalletExpenses.bind(this);
    this.populateTableExpenses = this.populateTableExpenses.bind(this);
    this.generateExpenseForm = this.generateExpenseForm.bind(this);

    this.state = {
      expense: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  // Gerar options do select de moedas via props
  generateCurrencySelect() {
    const { currencies } = this.props;
    const arrays = Object.keys(currencies);

    return arrays.map(
      (currency) => <option key={ currency } value={ currency }>{ currency }</option>,
    );
  }

  // Coloca os dados da despesa no estado
  handleChangeExpense({ id, value }) {
    this.setState((oldState) => ({ expense: { ...oldState.expense, [id]: value } }));
  }

  // Carrega o valor total das despesas
  loadTotalWalletExpenses() {
    const { expenses } = this.props;
    let total = 0;

    if (expenses.length > 0) {
      expenses.forEach((expense) => {
        total += Number(expense.value) * Number(
          expense.exchangeRates[expense.currency].ask,
        );
      });
    }

    return total;
  }

  // Popular a tabela de despesas
  populateTableExpenses() {
    const { expenses, dispatchDeleteExpense, startSetEditState } = this.props;

    return expenses.map((expense) => (
      <tr key={ expense.id }>
        <td>{ expense.description }</td>
        <td>{ expense.tag }</td>
        <td>{ expense.method }</td>
        <td>{ expense.value }</td>
        <td>{ expense.exchangeRates[expense.currency].name.split('/')[0] }</td>
        <td>{ parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
        <td>
          { (expense.exchangeRates[expense.currency].ask * expense.value).toFixed(2) }
        </td>
        <td>Real</td>
        <td>
          <button
            data-testid="edit-btn"
            type="button"
            onClick={ () => startSetEditState(expense.id) }
          >
            Editar
          </button>
          <button
            data-testid="delete-btn"
            type="button"
            onClick={ () => dispatchDeleteExpense(expense.id) }
          >
            Excluir
          </button>
        </td>
      </tr>));
  }

  //  Gerar cabeçalho da tabela de deespeas
  generateTableHeader() {
    return (
      <tr>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </tr>
    );
  }

  //  Gerar botão de ação
  generateButton() {
    const { expense } = this.state;
    const { dispatchAddExpense, dispatchEditedExpense, isEditing } = this.props;

    if (!isEditing) {
      return (
        <button type="button" onClick={ () => dispatchAddExpense(expense) }>
          Adicionar Despesa
        </button>
      );
    }

    if (isEditing) {
      return (
        <button type="button" onClick={ () => dispatchEditedExpense(expense) }>
          Editar Despesa
        </button>
      );
    }
  }

  //  Gerar Formulário de despesas
  generateExpenseForm() {
    const { isEditing } = this.props;

    if (!isEditing) {
      return (<ExpenseForm
        generateCurrencySelect={ this.generateCurrencySelect }
        handleChangeExpense={ this.handleChangeExpense }
      />);
    }
    return (<ExpenseForm
      generateCurrencySelect={ this.generateCurrencySelect }
      handleChangeExpense={ this.handleChangeExpense }
    />);
  }

  render() {
    const { email } = this.props;

    return (
      <>
        <header className="wallet-header">
          <div>
            <span data-testid="email-field">{`Email: ${email} `}</span>
            <br />
            <span data-testid="total-field">
              { `Total: ${this.loadTotalWalletExpenses()} `}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>

        <main className="wallet-main">
          { this.generateExpenseForm() }
        </main>
        <footer className="wallet-footer">
          { this.generateButton() }
          <table>
            <tbody>
              { this.generateTableHeader() }
              { this.populateTableExpenses() }
            </tbody>
          </table>
        </footer>
      </>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
  currencies: wallet.currencies,
  loadedPage: wallet.currencies.length !== 0,
  isEditing: wallet.isEditing,
  expenseToEdit: wallet.expenseToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchApi()),
  dispatchAddExpense: (expense) => dispatch(addExpense(expense)),
  dispatchDeleteExpense: (id) => dispatch(deleteExpense(id)),
  startSetEditState: (id) => dispatch(setEditState(id)),
  dispatchEditedExpense: (expense) => dispatch(saveEditedExpense(expense)),
});

Wallet.propTypes = {
  email: PropTypes.string,
  loadedPage: PropTypes.bool,
  isEditing: PropTypes.bool,
  currencies: PropTypes.array,
  expenseToEdit: PropTypes.object,
  fetchCurrencies: PropTypes.array,
  expenses: PropTypes.array,
  dispatchAddExpense: PropTypes.func,
  dispatchDeleteExpense: PropTypes.func,
  dispatchEditExpense: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
