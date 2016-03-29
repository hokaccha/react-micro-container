# react-micro-container

[![Build Status](https://travis-ci.org/hokaccha/react-micro-container.svg?branch=master)](https://travis-ci.org/hokaccha/react-micro-container)
[![npm version](https://badge.fury.io/js/react-micro-container.svg)](https://badge.fury.io/js/react-micro-container)

Flux is good architecture for react applications, but it's too complex to build small react application. For small applications, it's important to separate stateless components and stateful container components.

`react-micro-container` provides minimum features for container components.

## Installation

```
$ npm install react-micro-container
```

## Usage

Create stateless components that receive `dispatch` function via `props`.

```javascript
import React from 'react';

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
```

Next, create container class that has `dispatch` and `subscribe`. You can handle events and update state in the container.

```javascript
import React from 'react';
import MicroContainer from 'react-micro-container';
import Counter from '../components/counter';

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
```

Finally, mount to DOM. `CounterContainer` is also just a react component.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import CounterContainer from './containers/counter';

ReactDOM.render(<CounterContainer />, document.getElementById('app'));
```

## Thanks

This library is inspired by [mizchi](https://github.com/mizchi)'s article. Thanks!

## License

MIT
