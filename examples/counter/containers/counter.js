import React from 'react';
import Container from '../../../src/container';
import Counter from '../components/counter';

export default class CounterContainer extends Container {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    this.subscribe({
      increment: this.handleIncrement,
      decrement: this.handleDecrement,
    });
  }

  handleIncrement(count) {
    this.setState({ count: this.state.count + count });
  }

  handleDecrement(count) {
    this.setState({ count: this.state.count - count });
  }

  render() {
    return <Counter dispatch={this.dispatch} {...this.state} />;
  }
}
