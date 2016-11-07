import { expect } from 'chai';
import { mount } from 'enzyme';
import { describe, it } from 'mocha';
import React from 'react';
import configureMockStore from 'redux-mock-store';

import SignOut from '../../src/components/SignOut/SignOut';
import { signOut } from '../../src/modules/auth';

const mockStore = configureMockStore();

describe('SignOut', () => {
  it('sends sign out request', () => {
    const store = mockStore({});
    const component = mount(<SignOut store={store} />);

    component.find('.SignOut__Link').simulate('click');

    const actions = store.getActions();
    expect(actions).to.deep.equal([signOut()]);
  });
});
