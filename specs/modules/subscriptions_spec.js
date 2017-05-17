import { expect } from 'chai';
import { List } from 'immutable';
import { describe, it } from 'mocha';

import subscriptionsReducer, { setSubscriptions, fetchSubscriptions }
from '../../src/modules/subscriptions';

describe('subscriptonsReducer', () => {
  it('handles set subscriptions', () => {
    const initialState = null;
    const action = setSubscriptions([]);
    const nextState = subscriptionsReducer(initialState, action);
    expect(nextState).to.equal(new List([]));
  });

  it('ignores fetchSubscriptions', () => {
    const initialState = null;
    const action = fetchSubscriptions();
    const nextState = subscriptionsReducer(initialState, action);
    expect(nextState).to.equal(null);
  });
});
