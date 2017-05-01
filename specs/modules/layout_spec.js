import { expect } from 'chai';
import { Map } from 'immutable';
import { describe, it } from 'mocha';

import layoutReducer, { toggleLeftMenu } from '../../src/modules/layout';

describe('layoutReducer', () => {
  it('has proper initial state', () => {
    expect(layoutReducer(undefined, {})).to.equal(Map({
      leftMenuExpanded: true,
      leftMenuAddSubscriptionExpanded: false,
    }));
  });

  it('handles toggling left menu', () => {
    const initialState = Map({ leftMenuExpanded: true });
    const action = toggleLeftMenu();
    const nextState = layoutReducer(initialState, action);
    expect(nextState).to.equal(Map({ leftMenuExpanded: false }));
  });
});
