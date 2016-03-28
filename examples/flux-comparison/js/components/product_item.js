import React from 'react';

export default class ProductItem extends React.Component {
  static get propTypes() {
    return {
      product: React.PropTypes.shape({
        image: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        inventory: React.PropTypes.number.isRequired,
      }).isRequired,
      dispatch: React.PropTypes.func.isRequired,
    };
  }

  render() {
    let product = this.props.product;

    return (
      <div className="uk-panel uk-panel-box uk-margin-bottom">
        <img className="uk-thumbnail uk-thumbnail-mini uk-align-left" src={product.image} />
        <h4 className="uk-h4">{product.title} - &euro;{product.price}</h4>
        <button className="uk-button uk-button-small uk-button-primary"
          onClick={() => this.props.dispatch('addToCart', this.props.product)}
          disabled={product.inventory > 0 ? '' : 'disabled'}>
          {product.inventory > 0 ? 'Add to cart' : 'Sold Out'}
        </button>
      </div>
    );
  }
}
