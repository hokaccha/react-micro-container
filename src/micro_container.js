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
    this.emitter.emit(...args);
  }

  on(...args) {
    this.emitter.on(...args);
  }

  subscribe(events) {
    Object.keys(events).forEach(name => {
      let handler = events[name];
      this.on(name, handler.bind(this));
    });
  }

  unsubscribe() {
    this.emitter.removeAllListeners();
  }
}
