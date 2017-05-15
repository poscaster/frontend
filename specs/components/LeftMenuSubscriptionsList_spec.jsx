import { expect } from 'chai';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import { describe, it } from 'mocha';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import LeftMenuSubscriptionsList
from '../../src/components/LeftMenuSubscriptionsList/LeftMenuSubscriptionsList';
import { fetchSubscriptions } from '../../src/modules/subscriptions';

const mockStore = configureMockStore();

describe('LeftMenuSubscriptionsList', () => {
  it('renders properly with subscriptions', () => {
    const store = mockStore({
      subscriptions: fromJS([
        { feed_id: 1, title: 'test 1' },
        { feed_id: 12, title: 'test 431' },
      ]),
    });
    const component = mount(<Provider store={store}><LeftMenuSubscriptionsList /></Provider>);

    expect(component.find('.LeftMenuSubscriptionsList__Header')).to.be.present();
    expect(component.find('.LeftMenuSubscriptionsList__List')).to.be.present();
    const t1 = component.find('.LeftMenuSubscriptionsList__List li').at(0);
    expect(t1.key()).to.equal('1');
    expect(t1).to.have.text('test 1');
    const t2 = component.find('.LeftMenuSubscriptionsList__List li').at(1);
    expect(t2.key()).to.equal('12');
    expect(t2).to.have.text('test 431');

    const actions = store.getActions();
    expect(actions).to.be.empty();
  });

  it('renders properly w/o subscriptions', () => {
    const store = mockStore({ subscriptions: null });
    const component = mount(<Provider store={store}><LeftMenuSubscriptionsList /></Provider>);
    expect(component.find('.LeftMenuSubscriptionsList__FetchingMsg')).to.be.present();

    const actions = store.getActions();
    expect(actions).to.deep.equal([fetchSubscriptions()]);
  });
});
