import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkout extends Component {
  render() {
    const { location: { state: { shoppingCart } } } = this.props;
    return (
      <form>
        <section>
          <h3>Revise seus Produtos</h3>
          <div>
            {shoppingCart.map((product) => {
              const { title, price, thumbnail } = product;
              return (
                <div key={ title }>
                  <p>{ title }</p>
                  <img src={ thumbnail } alt={ title } />
                  <p>
                    R$:
                    { price }
                  </p>
                </div>
              );
            })}
            <div>
              <h4> Valor total:</h4>
              <p>
                {shoppingCart.reduce((total, product) => {
                  const { price } = product;
                  const result = total + price;
                  return result;
                }, 0)}
              </p>
            </div>
          </div>
        </section>
        <h3>Informações do Comprador</h3>
        <section>
          <input
            data-testid="checkout-fullname"
            type="text"
            placeholder="Nome Completo"
          />
          <input
            data-testid="checkout-email"
            type="text"
            placeholder="CPF"
          />
          <input
            data-testid="checkout-cpf"
            type="email"
            placeholder="Email"
          />
          <input
            data-testid="checkout-phone"
            type="text"
            placeholder="Telefone"
          />
          <input
            data-testid="checkout-cep"
            type="text"
            placeholder="CEP"
          />
          <input
            data-testid="checkout-address"
            type="text"
            placeholder="Endereço"
          />
          <input type="text" placeholder="Complemento" />
          <input type="text" placeholder="Número" />
          <input type="text" placeholder="Cidade" />
          <select>
            <option>Estado</option>
          </select>
        </section>
        <section>
          <h2>Método de Pagamento</h2>
          <div>
            <label htmlFor="boleto">
              Boleto
              <input id="boleto" type="radio" name="payment" value="Boleto" />
            </label>
          </div>
          <div>
            <label htmlFor="visa">
              Visa
              <input id="visa" type="radio" name="payment" value="Visa" />
            </label>
          </div>
          <div>
            <label htmlFor="mastercard">
              Mastercard
              <input id="mastercard" type="radio" name="payment" value="Mastercard" />
            </label>
          </div>
          <div>
            <label htmlFor="elo">
              Elo
              <input id="elo" type="radio" name="payment" value="Elo" />
            </label>
          </div>
        </section>
        <button type="submit">Comprar</button>
      </form>
    );
  }
}

Checkout.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      shoppingCart: PropTypes.arrayOf(PropTypes.shape),
    }).isRequired,
  }).isRequired,
}.isRequired;

export default Checkout;
