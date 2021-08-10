import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setLogin } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.validateEmailInput = this.validateEmailInput.bind(this);
    this.validatePasswordInput = this.validatePasswordInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.redirectToWallet = this.redirectToWallet.bind(this);

    this.state = {
      email: '',
      password: '',
      redirect: false,
    };
  }

  // Verificar se os campos estão preenchidos
  // *SOURCE* https://cursos.alura.com.br/forum/topico-como-validar-email-e-senha-em-javascript-80469
  validateEmailInput() {
    const { email } = this.state;
    const test = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

    return test.test(email);
  }

  validatePasswordInput() {
    const { password } = this.state;
    const MIN_CARACTERES = 6;

    if (password.length >= MIN_CARACTERES) {
      return true;
    }
  }

  // Captura a digitação dos inputs para o estado
  handleChange({ id, value }) {
    this.setState({ [id]: value });
  }

  // Redirecionar para carteira
  redirectToWallet() {
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    const validateFields = this.validateEmailInput() && this.validatePasswordInput();
    const { dispatchEmail } = this.props;

    if (redirect) return <Redirect to="/carteira" />;

    return (
      <section className="loginSection">
        <input
          id="email"
          type="text"
          placeholder="Email"
          data-testid="email-input"
          onChange={ ({ target }) => (
            dispatchEmail(target)
          && this.handleChange(target)
          ) }
        />
        <input
          id="password"
          type="password"
          placeholder="Senha"
          data-testid="password-input"
          onChange={ ({ target }) => this.handleChange(target) }
        />
        <button
          type="button"
          disabled={ !validateFields }
          onClick={ this.redirectToWallet }
        >
          Entrar
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: ({ value }) => dispatch(setLogin(value)),
});

Login.propTypes = {
  dispatchEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
