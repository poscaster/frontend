import { expect } from 'chai';
import { mount } from 'enzyme';
import { Map } from 'immutable';
import { describe, it } from 'mocha';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import LeftMenuAddSubscriptionsBlock
from '../../src/components/LeftMenuAddSubscriptionsBlock/LeftMenuAddSubscriptionsBlock';
import { toggleLeftMenuAddSubscription } from '../../src/modules/layout';
import { addSubscription } from '../../src/modules/subscriptions';

const mockStore = configureMockStore();

describe('LeftMenuAddSubscriptionsBlock', () => {
  it('redners properly when expanded', () => {
    const store = mockStore({ layout: Map({ leftMenuAddSubscriptionExpanded: true }) });
    const component = mount(<Provider store={store}><LeftMenuAddSubscriptionsBlock /></Provider>);

    expect(component.find('.LeftMenuAddSubscriptionsBlock__Input--Expanded')).to.be.present();
  });

  it('renders properly when collapsed', () => {
    const store = mockStore({ layout: Map({ leftMenuAddSubscriptionExpanded: false }) });
    const component = mount(<Provider store={store}><LeftMenuAddSubscriptionsBlock /></Provider>);

    expect(component.find('.LeftMenuAddSubscriptionsBlock__Input--Collapsed')).to.be.present();
  });

  it('adds new subscrption', () => {
    const store = mockStore({ layout: Map({ leftMenuAddSubscriptionExpanded: false }) });
    const component = mount(<Provider store={store}><LeftMenuAddSubscriptionsBlock /></Provider>);
    component.find('.LeftMenuAddSubscriptionsBlock__Input--Collapsed')
      .simulate('focus')
      .simulate('change', { target: { value: 'http://example.com/test.rss' } });
    component.find('.LeftMenuAddSubscriptionsBlock__SubscribeBtn').simulate('click');

    const actions = store.getActions();
    expect(actions).to.deep.equal([
      toggleLeftMenuAddSubscription(),
      addSubscription('http://example.com/test.rss'),
    ]);
  });

  it('blurs input correctly', () => {
    const store = mockStore({ layout: Map({ leftMenuAddSubscriptionExpanded: true }) });
    const component = mount(<Provider store={store}><LeftMenuAddSubscriptionsBlock /></Provider>);
    component.find('.LeftMenuAddSubscriptionsBlock__Input--Expanded')
      .simulate('blur')
      .simulate('change', { target: { value: 'http://example.com/test.rss' } })
      .simulate('blur')
      .simulate('change', { target: { value: '' } })
      .simulate('blur')
      .simulate('focus');

    const actions = store.getActions();
    expect(actions).to.deep.equal([
      toggleLeftMenuAddSubscription(),
      toggleLeftMenuAddSubscription(),
    ]);
  });
});
