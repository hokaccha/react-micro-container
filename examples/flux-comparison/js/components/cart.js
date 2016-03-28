import React from 'react';

class Product extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default class Cart extends React.Component {
  static get propTypes() {
    return {
      products: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        quantity: React.PropTypes.number.isRequired,
      })).isRequired,
      total: React.PropTypes.string.isRequired,
      dispatch: React.PropTypes.func.isRequired,
    };
  }

  render() {
    let products = this.props.products;

    let hasProducts = products.length > 0;
    let nodes = !hasProducts ?
      <div>Please add some products to cart.</div> :
      products.map(p => {
        return <Product key={p.id}>{p.title} - &euro;{p.price} x {p.quantity}</Product>;
      });

    return (
      <div className="cart uk-panel uk-panel-box uk-panel-box-primary">
        <div className="uk-badge uk-margin-bottom">Your Cart</div>
        <div className="uk-margin-small-bottom">{nodes}</div>
        <div className="uk-margin-small-bottom">Total: &euro;{this.props.total}</div>
        <button className="uk-button uk-button-large uk-button-success uk-align-right"
          onClick={() => this.props.dispatch('checkout')}
          disabled={hasProducts ? '' : 'disabled'}>
          Checkout
        </button>
      </div>
    );
  }
}
