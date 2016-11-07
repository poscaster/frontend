import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { Map } from 'immutable';
import { describe, it } from 'mocha';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import LeftMenuUserBlock from '../../src/components/LeftMenuUserBlock/LeftMenuUserBlock';

const mockStore = configureMockStore();

describe('LeftMenuUserBlock', () => {
  it('redners properly when user logged in', () => {
    const store = mockStore({ auth: Map({ user: Map({}) }) });
    const component = mount(<Provider store={store}><LeftMenuUserBlock /></Provider>);

    expect(component.find('.SignOut')).to.be.present();
    expect(component.find('.UserInfo')).to.be.present();
  });

  it('redners properly when closed', () => {
    const component = shallow(<LeftMenuUserBlock.WrappedComponent user={null} />);

    expect(component.find('.LeftMenuUserBlock__Tabs')).to.be.present();
  });

  it('handles toggling', () => {
    const store = mockStore({ auth: Map({ user: null }) });
    const component = mount(<Provider store={store}><LeftMenuUserBlock /></Provider>);
    expect(component.find('.LeftMenuUserBlock__Tab--Active a')).to.have.text('Sign In');

    component.find('.LeftMenuUserBlock__Tab a').simulate('click');

    expect(component.find('.LeftMenuUserBlock__Tab--Active a')).to.have.text('Sign Up');
  });
});
