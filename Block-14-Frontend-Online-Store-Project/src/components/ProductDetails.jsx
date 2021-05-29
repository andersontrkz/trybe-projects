import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';

class ProductDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      render: false,
      shoppingCart: [],
      listComments: [],
      totalQuantityItems: 0,
    };
  }

  componentDidMount() {
    this.populateShoppingCart();
    this.setRenderedState();
  }

  // Recarrega o carrinho de compras
  populateShoppingCart = () => {
    // const { location: { state: { shoppingCart: items } } } = this.props;
    const items = JSON.parse(localStorage.getItem('localStorageCart'));


    this.setState(
      { shoppingCart: items }, () => this.updateProductsQuantity(),
    );

    this.updateLocalStorageQuantity();
  }

  // Atualiza a quantidade total de produtos no carrinho
  updateProductsQuantity = () => {
    const { shoppingCart } = this.state;

    if (!shoppingCart) {
        
      } else { 
        const totalQuantity = shoppingCart.reduce(
          (quantityAccumulator, product) => quantityAccumulator + product.quantity, 0,
        );
    
        this.setState({ totalQuantityItems: totalQuantity });
      
      }
}

  updateComments = (newComment) => {
    this.setState((oldState) => (
      { listComments: [newComment, ...oldState.listComments] }
    ), () => {
    });
  }

  //  Seta o estado Rendenizar para VERDADEIRO
  setRenderedState = () => {
    this.setState({ render: true });
  }

  //  Adiciona o produto ao carrinho de compras
  addProductToShoppingCart = (product) => {
    const shoppingCartlocal = JSON.parse(localStorage.getItem('localStorageCart'));
    if (!shoppingCartlocal) {
      product.quantity = 1;
      localStorage.setItem('localStorageCart', JSON.stringify([product]))
      this.updateLocalStorageQuantity();
      this.setState({ totalQuantityItems: 1})
    console.log('dentro do 1')

    } else { 
      console.log('dentro do 2')


      const shoppingCartlocal = JSON.parse(localStorage.getItem('localStorageCart'));
      const testIfProductExistlocal = shoppingCartlocal.find(
        (oldProduct) => oldProduct.id === product.id,
      );

      if (testIfProductExistlocal === undefined) {
          product.quantity = 1;
          localStorage.setItem('localStorageCart', JSON.stringify([...shoppingCartlocal, product]))
          this.updateLocalStorageQuantity();
          this.setState({ totalQuantityItems: 1})
        } else {
          if (shoppingCartlocal.length > 0) {
            let count = 0;
            let count2 = 0;
              
            shoppingCartlocal.forEach((productFind) => {
                if((product.id !== productFind.id) && (count2 === 0)) {
                  count += 1;
                } else {
                  count2 += 1;
                }
              })
              
            shoppingCartlocal[count].quantity = product.quantity += 1;
            localStorage.setItem('localStorageCart', JSON.stringify(shoppingCartlocal));
          } else {
            product.quantity += 1;
            localStorage.setItem('localStorageCart', JSON.stringify([product]));
          }
          this.updateLocalStorageQuantity();
          this.setState({ totalQuantityItems: 1})
        }
    }
  }

  updateLocalStorageQuantity = () => {
    const shoppingCart = JSON.parse(localStorage.getItem('localStorageCart'));

    if (!shoppingCart) {
      localStorage.setItem('cartQuantity', JSON.stringify(0))
    } else {
      const totalQuantity = shoppingCart.reduce(
        (quantityAccumulator, product) => quantityAccumulator + product.quantity, 0,
      );
  
      localStorage.setItem('cartQuantity', JSON.stringify(totalQuantity))
    }
  }

  getLocalStorageQuantity = () => {
    const totalQuantity = JSON.parse(localStorage.getItem('cartQuantity'));

    if(totalQuantity) {
      return totalQuantity;
    }
    return 0;
  }

  getProductFromLocalStorage = () => {
    const shoppingCartlocal = JSON.parse(localStorage.getItem('localStorageCart'));
    const { location: { state: { result } } } = this.props;

    if (!shoppingCartlocal) {
      return result;
    } 

    const findedProduct = shoppingCartlocal.find(
      (product) => product.id === result.id,
    );

    if (!findedProduct) {
      return result;
    } 

    return findedProduct;
  }

  render() {
    const { render, shoppingCart } = this.state;
    const { location: { state: { result } } } = this.props;

    const {
      title, thumbnail, price, address: { city_name: city, state_name: state },
    } = result;

    if (render) {
      const { listComments } = this.state;
      return (
        <>
          <main className="product-details">
            <section className="product-details-left">
              <h1 data-testid="product-detail-name">{ title }</h1>
              <img className="product-details-image" src={ thumbnail } alt={ title } />
            </section>

            <section className="product-details-right">
              <ul>
                <h1>Descrição do Produto</h1>
                <li>{ title }</li>
                <li>{ price }</li>
                <h4>Localização do Produto</h4>
                <li>{ city }</li>
                <li>{ state }</li>
              </ul>
              <button
                type="submit"
                data-testid="product-detail-add-to-cart"
                onClick={ () => this.addProductToShoppingCart(this.getProductFromLocalStorage()) }
              >
                Adicionar ao Carrinho
              </button>
              <Link
                to={ { pathname: '/ShopCart', state: { shoppingCart } } }
                data-testid="shopping-cart-button"
              >
                Ver Carrinho
              </Link>
              <span data-testid="shopping-cart-size">
                Produtos no carrinho:
                { this.getLocalStorageQuantity() }
              </span>
            </section>

          </main>
          <section>
            <Form updateComments={ this.updateComments } />
          </section>
          <section id="comments">
            <h1>Comentários</h1>
            { listComments.map((coment) => {
              const { email, rating, comment } = coment;
              return (
                <>
                  <h2 key={ email }>{ email }</h2>
                  { comment && <p>{ comment }</p> }
                  <p key={ rating }>{ rating }</p>
                </>
              );
            }) }
          </section>
        </>
      );
    }
    return <h1>Carregando...</h1>;
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      category_id: PropTypes.string,
      typedProduct: PropTypes.string,
    }).isRequired,
  }).isRequired,
}.isRequired;

export default ProductDetails;
