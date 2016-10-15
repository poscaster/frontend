import { expect } from 'chai';
import { mount, render } from 'enzyme';
import { Map } from 'immutable';
import { describe, it } from 'mocha';
import React from 'react';
import configureMockStore from 'redux-mock-store';

import Counter from '../../src/components/Counter/Counter';
import { decrement, increment } from '../../src/modules/counter';

const mockStore = configureMockStore();

describe('Counter', () => {
  it('displays current count and buttons', () => {
    const store = mockStore({ counter: new Map({ count: 321 }) });
    const component = render(<Counter store={store} />);

    expect(component.find('.Counter__DecrementButton').text()).to.equal('-');
    expect(component.find('.Counter__IncrementButton').text()).to.equal('+');
    expect(component.text()).to.contain('321');
  });

  it('decrements value', () => {
    const store = mockStore({ counter: new Map({ count: 321 }) });
    const component = mount(<Counter store={store} />);

    component.find('.Counter__DecrementButton').simulate('click');
    const actions = store.getActions();
    expect(actions).to.deep.equal([decrement()]);
  });

  it('increments value', () => {
    const store = mockStore({ counter: new Map({ count: 321 }) });
    const component = mount(<Counter store={store} />);

    component.find('.Counter__IncrementButton').simulate('click');
    const actions = store.getActions();
    expect(actions).to.deep.equal([increment()]);
  });
});
