import React from 'react';
import MicroContainer from '../../../../src/micro_container';
import Products from '../components/products';
import Shop from '../../common/api/shop';
import Cart from '../components/cart';

export default class AppContainer extends MicroContainer {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Flux Shop Demo (react-micro-container)',
      products: [],
      addedProducts: [],
      total: '',
    };

    this.addedProductsById = {};
  }

  componentDidMount() {
    this.fetchInitialData();
    this.subscribe({
      addToCart: this.handleAddToCart,
      checkout: this.handleCheckout,
    });
  }

  fetchInitialData() {
    Shop.getProducts(products => this.setState({ products }));
  }

  handleAddToCart(product) {
    product.inventory = product.inventory > 0 ? product.inventory - 1 : 0;

    let addedProduct = this.addedProductsById[product.id];
    if (addedProduct) {
      addedProduct.quantity++;
    }
    else {
      this.addedProductsById[product.id] = Object.assign({ quantity: 1 }, product);
    }

    this.update();
  }

  getAddedProducts() {
    return Object.values(this.addedProductsById);
  }

  handleCheckout() {
    let products = this.getAddedProducts();
    Shop.buyProducts(products, () => {
      console.log('YOU BOUGHT:', products);
    });

    this.addedProductsById = {};
    this.update();
  }

  update() {
    this.setState({
      addedProducts: this.getAddedProducts(),
      total: this.calcTotal(),
    });
  }

  calcTotal() {
    return this.getAddedProducts().reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0).toFixed(2);
  }

  render() {
    return (
      <div>
        <Products dispatch={this.dispatch} products={this.state.products} title={this.state.title} />
        <Cart dispatch={this.dispatch} products={this.state.addedProducts} total={this.state.total} />
      </div>
    );
  }
}
