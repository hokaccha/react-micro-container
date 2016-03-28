import React from 'react';
import ProductItem from './product_item';

export default class Products extends React.Component {
  static get propTypes() {
    return {
      title: React.PropTypes.string.isRequired,
      products: React.PropTypes.array.isRequired,
      dispatch: React.PropTypes.func.isRequired,
    };
  }

  render() {
    let items = this.props.products.map(product => {
      return <ProductItem key={product.id} product={product} dispatch={this.props.dispatch} />;
    });

    return (
      <div className="shop-wrap">
        <h2 className="uk-h2">{this.props.title}</h2>
        <div>{items}</div>
      </div>
    );
  }
}
