function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

const setTotalPrice = (price) => {
  const spanPrice = document.getElementsByClassName('total-price')[0];

  if (price === 0) {
    spanPrice.innerText = '0.00';
  } else {
    spanPrice.innerText = `${price}`;
  }
};

const sumTotalShoppingCart = async () => {
  const shoppingCartProducts = document.querySelectorAll('.cart__item');
  const totalCart = [0];

  shoppingCartProducts.forEach((product) => {
    const productPrice = product.innerText.split('$')[1];

    totalCart.push(Number(productPrice));
  });

  const totalPrice = totalCart.reduce((accumulator, current) => accumulator + current);

  setTotalPrice(totalPrice);
};

function cartItemClickListener(event) {
  const shoppingCart = document.getElementsByClassName('cart__items')[0];
  const productId = event.target.innerText.split(' ');

  shoppingCart.removeChild(event.target);
  localStorage.removeItem(productId[1]);

  sumTotalShoppingCart();
}

const emptyShoppingCart = () => {
  const emptyButton = document.getElementsByClassName('empty-cart')[0];
  const shoppingCart = document.getElementsByClassName('cart__items')[0];

  emptyButton.addEventListener('click', () => {
    localStorage.clear();
    shoppingCart.innerHTML = '';
    setTotalPrice(0);
  });
};

const allItemsLocalStorage = () => Object.values(localStorage);

const getListLocalStorage = (localStorage) => {
  const shoppingCart = document.querySelector('.cart__items');

  localStorage.forEach((itemJason) => {
    const product = document.createElement('li');
    const item = JSON.parse(itemJason);

    product.className = 'cart__item';
    product.innerText = `SKU: ${item.sku} | NAME: ${item.name} | `
    + `PRICE: $${item.salePrice}`;
    product.addEventListener('click', cartItemClickListener);
    shoppingCart.appendChild(product);
  });
};

// https://www.horadecodar.com.br/2020/07/21/como-salvar-um-objeto-na-localstorage/
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  const product = {
    sku, 
    name, 
    salePrice,
  };

  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  localStorage.setItem(sku, JSON.stringify(product));

  return li;
}

const getFetch = async (term) => {
  const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${term}`);
  const dataJson = await data.json();

  return dataJson;
};

const fetchProduct = async (itemId) => {
  const dataProduct = await fetch(`https://api.mercadolibre.com/items/${itemId}`);
  const dataProductJason = await dataProduct.json();

  return dataProductJason;
};

const renderElement = (element) => document
  .querySelector('.items')
  .appendChild(createProductItemElement(element));

const getResult = ({ results }) => {
  const searchResult = results.forEach((result) => {
    const resultObject = {
      sku: result.id,
      name: result.title,
      image: result.thumbnail,
    };

    renderElement(resultObject);
  });

  return searchResult;
};

const getResultProduct = (results) => {
  const resultObject = {
    sku: results.id,
    name: results.title,
    salePrice: results.price,
  };
  
  return resultObject;
};

const getListProducts = async () => {
  getResult(await getFetch('computador'));
};

const addShoppingCart = () => {
  const product = document.querySelectorAll('.item__add').forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = event.target.parentNode.firstChild.innerText;
      const shoppingCart = document.querySelector('.cart__items');

      fetchProduct(productId).then((dataProduct) => {
        shoppingCart.appendChild(createCartItemElement(getResultProduct(dataProduct)));
      }).then(() => {
        sumTotalShoppingCart();
      });
    });
  });
  
  return product;
};

const loadingContent = () => {
  const spanLoading = document.getElementsByClassName('loading')[0];
  spanLoading.innerText = 'Carregando...';
};

const loadedContent = () => {
  const spanLoading = document.getElementsByClassName('loading')[0];
  spanLoading.remove();
};

window.onload = async function onload() {
  loadingContent();
  getListProducts()
  .then(() => {
    addShoppingCart();
    emptyShoppingCart();
    getListLocalStorage(allItemsLocalStorage());
  }).then(() => {
    sumTotalShoppingCart();
  }).then(() => {
    loadedContent();
  });
};
