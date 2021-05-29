import React from 'react';
import PropTypes from 'prop-types';

import './ShoppingCartCard.css';

class ShoppingCartCard extends React.Component {
  render() {
    const { productCart, changeProductQuantity } = this.props;
    const { title, price, thumbnail, quantity } = productCart;

    return (
      <main className="shopping-cart-card">
        <section className="shopping-cart-card-item button">
          <button type="submit" className="card-button">X</button>
        </section>
        <section className="shopping-cart-card-item">
          <img className="image" src={ thumbnail } alt={ title } />
        </section>
        <section
          className="shopping-cart-card-item title"
          data-testid="shopping-cart-product-name"
        >
          { title }
        </section>
        <section className="shopping-cart-card-item button">
          <button
            onClick={ (event) => changeProductQuantity('-', productCart, event) }
            data-testid="product-decrease-quantity"
            className="card-button"
            type="submit"
          >
            -
          </button>
        </section>
        <section className="shopping-cart-card-item">
          <span data-testid="shopping-cart-product-quantity">{quantity}</span>
        </section>
        <section className="shopping-cart-card-item button">
          <button
            onClick={ (event) => changeProductQuantity('+', productCart, event) }
            data-testid="product-increase-quantity"
            className="card-button"
            type="submit"
          >
            +
          </button>
        </section>
        <section className="shopping-cart-card-item price">{ price }</section>
      </main>
    );
  }
}

ShoppingCartCard.propTypes = {
  productCart: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    thimbnail: PropTypes.string,
    quantity: PropTypes.number,
  }),
}.isRequired;

export default ShoppingCartCard;
