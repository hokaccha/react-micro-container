import React from 'react';
import { EventEmitter } from 'events';

export default class MicroContainer extends React.Component {
  constructor(props) {
    super(props);

    this.emitter = new EventEmitter();
    this.dispatch = this.dispatch.bind(this);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  dispatch(...args) {
    return this.emitter.emit(...args);
  }

  subscribe(events) {
    Object.keys(events).forEach(name => {
      let handler = events[name];
      this.emitter.on(name, handler.bind(this));
    });
  }

  unsubscribe() {
    this.emitter.removeAllListeners();
  }
}
