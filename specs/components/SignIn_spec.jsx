import { expect } from 'chai';
import { mount, render } from 'enzyme';
import { Map } from 'immutable';
import { describe, it } from 'mocha';
import React from 'react';
import configureMockStore from 'redux-mock-store';

import SignIn from '../../src/components/SignIn/SignIn';
import { signIn } from '../../src/modules/auth';

const mockStore = configureMockStore();

describe('SignIn', () => {
  it('sends sign in request', () => {
    const store = mockStore({ auth: Map({}) });
    const component = mount(<SignIn store={store} />);

    component.find('.SignIn__Input').simulate('change', { target: { value: 'testlogin' } });
    component.find('.SignIn__Input--WithBtn').simulate('change', { target: { value: 'testpass' } });
    component.find('.SignIn__Btn').simulate('click');

    const actions = store.getActions();
    expect(actions).to.deep.equal([signIn({ login: 'testlogin', password: 'testpass' })]);
  });

  it('displays error', () => {
    const store = mockStore({
      auth: Map({
        signInErrors: Map({
          error: Map({
            error: 'Test error!!!',
          }),
        }),
      }),
    });
    const component = render(<SignIn store={store} />);

    expect(component.find('.SignIn__ErrorMessage').text()).to.equal('Test error!!!');
  });
});
