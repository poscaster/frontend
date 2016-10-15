import { expect } from 'chai';
import { Map } from 'immutable';
import { describe, it } from 'mocha';

import counterReducer, { increment, decrement } from '../../src/modules/counter';

describe('counterReducer', () => {
  it('handles increment', () => {
    const initialState = new Map({ count: 0 });
    const action = increment();
    const nextState = counterReducer(initialState, action);
    expect(nextState).to.equal(new Map({ count: 1 }));
  });

  it('handles decrement', () => {
    const initialState = new Map({ count: 0 });
    const action = decrement();
    const nextState = counterReducer(initialState, action);
    expect(nextState).to.equal(new Map({ count: -1 }));
  });

  it('has proper initial state', () => {
    expect(counterReducer(undefined, {})).to.equal(new Map({ count: 0 }));
  });
});
