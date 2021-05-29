import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShoppingCartCard from './ShoppingCartCard';

class ShopCart extends React.Component {
  constructor() {
    super();

    this.state = {
      shoppingCartProducts: [],
      totalPriceShoppingCart: 0,
      totalQuantityItems: 0,
    };
  }

  componentDidMount() {
    this.setTotalPriceValue();
    this.populateShoppingCart();
  }

  // Popula o state carrinho com os itens da rota anterior
  populateShoppingCart = () => {
    const { location: { state: { shoppingCart } } } = this.props;

    this.setState(
      { shoppingCartProducts: shoppingCart }, () => this.updateProductsQuantity(),
    );
  }

  //  Seta o valor total da compra
  setTotalPriceValue = () => {
    const { location: { state: { shoppingCart } } } = this.props;
    const totalPrice = shoppingCart.reduce(
      (totalAccumulator, productCart) => totalAccumulator + productCart.price, 0,
    );

    this.setState({ totalPriceShoppingCart: totalPrice });
  }

  //  Escolhe a quantidade do produto
  changeProductQuantity = (symbol, product) => {
    if ((symbol === '+') && (product.quantity < product.available_quantity)) {
      product.quantity += 1;
    }

    if ((symbol === '-') && (product.quantity > 1)) {
      product.quantity -= 1;
    }

    this.updateProductsQuantity();
  }

  //  Captura a quantidade de produtos no carrinho
  updateProductsQuantity = () => {
    const { shoppingCartProducts } = this.state;
    const totalQuantity = shoppingCartProducts.reduce(
      (quantityAccumulator, product) => quantityAccumulator + product.quantity, 0,
    );

    this.setState({ totalQuantityItems: totalQuantity });
  }

  render() {
    const {
      totalPriceShoppingCart, shoppingCartProducts, totalQuantityItems,
    } = this.state;
    const { location: { state: { shoppingCart } } } = this.props;

    if (shoppingCartProducts.length) {
      return (
        <main>
          <h1>Carrinho de compras</h1>
          {shoppingCartProducts.map((productCart) => (
            <ShoppingCartCard
              key={ productCart.id }
              productCart={ productCart }
              changeProductQuantity={ this.changeProductQuantity }
            />
          ))}
          <span>
            {totalQuantityItems}
          </span>
          <span>
            <p>Valor total da compra:</p>
            {totalPriceShoppingCart}
          </span>
          <Link
            data-testid="checkout-products"
            to={ { pathname: '/ShopCart/Checkout', state: { shoppingCart } } }
          >
            checkout
          </Link>
        </main>
      );
    }

    return (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    );
  }
}

ShopCart.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      shoppingCart: PropTypes.arrayOf(PropTypes.shape),
    }).isRequired,
  }).isRequired,
}.isRequired;

export default ShopCart;
