# react-micro-container

## Install

```
$ npm install react-micro-container
```

## Usage

```javascript
import React from 'react';

// Stateless component
class Counter extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.count}</div>
        <button onClick={() => this.props.dispatch('increment', 1)}>+1</button>
        <button onClick={() => this.props.dispatch('decrement', 1)}>-1</button>
        <button onClick={() => this.props.dispatch('increment', 100)}>+100</button>
      </div>
    );
  }
}

Counter.propTypes = {
  count: React.PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

// Stateful container component
import MicroContainer from 'react-micro-container';

class CounterContainer extends MicroContainer {
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

// Render to DOM
import ReactDOM from 'react-dom';
ReactDOM.render(<CounterContainer />, document.getElementById('app'));
```

## License

MIT
