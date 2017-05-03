import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { Map } from 'immutable';
import { describe, it } from 'mocha';
import React from 'react';
import configureMockStore from 'redux-mock-store';

import LeftMenu from '../../src/components/LeftMenu/LeftMenu';
import LeftMenuSubscriptionsBlock
from '../../src/components/LeftMenuSubscriptionsBlock/LeftMenuSubscriptionsBlock';
import { toggleLeftMenu } from '../../src/modules/layout';

const mockStore = configureMockStore();
// istanbul ignore next
const noop = () => {};

describe('LeftMenu', () => {
  it('redners properly when open', () => {
    const component = shallow(<LeftMenu.WrappedComponent expanded toggle={noop} authorized />);

    expect(component.find('.LeftMenu--Expanded')).to.be.present();
    expect(component.find(LeftMenuSubscriptionsBlock)).to.be.present();
  });

  it('redners properly when closed', () => {
    const component = shallow(<LeftMenu.WrappedComponent toggle={noop} />);

    expect(component.find('.LeftMenu--Collapsed')).to.be.present();
  });

  it('handles toggling', () => {
    const store = mockStore({ layout: Map({ leftMenuExpanded: false }), auth: Map({}) });
    const component = mount(<LeftMenu store={store} />);

    component.find('.LeftMenu__ToggleBtn').simulate('click');

    const actions = store.getActions();
    expect(actions).to.deep.equal([toggleLeftMenu()]);
  });
});
