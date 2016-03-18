import assert from 'power-assert';
import sinon from 'sinon';
import React from 'react';
import MicroContainer from '../src/micro_container';

describe('MicroContainer', () => {
  let spy;
  let container;
  class Container extends MicroContainer {}

  beforeEach(() => {
    spy = sinon.spy();
    container = new Container();
    container.subscribe({ foo: spy });
    container.dispatch('foo', 'bar', 'baz');
  });

  it('should inherit React.Component', () => {
    assert(container instanceof React.Component);
  });

  it('should be called registered function', () => {
    assert(spy.callCount === 1);
  });

  it('`this` value should be container', () => {
    assert(spy.thisValues[0] === container);
  });

  it('should receive arguments', () => {
    assert(spy.args[0][0] === 'bar');
    assert(spy.args[0][1] === 'baz');
  });

  it('should remove event when call `unsubscribe`', () => {
    container.unsubscribe();
    container.dispatch('foo');
    assert(spy.callCount === 1);
  });
});
