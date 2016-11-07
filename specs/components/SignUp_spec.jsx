import { expect } from 'chai';
import { mount, render } from 'enzyme';
import { Map } from 'immutable';
import { describe, it } from 'mocha';
import React from 'react';
import configureMockStore from 'redux-mock-store';

import SignUp from '../../src/components/SignUp/SignUp';
import { signUp } from '../../src/modules/auth';

const mockStore = configureMockStore();

describe('SignUp', () => {
  it('sends sign up request', () => {
    const store = mockStore({ auth: Map({}) });
    const component = mount(<SignUp store={store} />);

    component.find('.SignUp__Input[placeholder="Invitation code"]')
      .simulate('change', { target: { value: 'testinv' } });
    component.find('.SignUp__Input[placeholder="Login"]')
      .simulate('change', { target: { value: 'testlogin' } });
    component.find('.SignUp__Input[placeholder="Email"]')
      .simulate('change', { target: { value: 'testemail' } });
    component.find('.SignUp__Input[placeholder="Password"]')
      .simulate('change', { target: { value: 'testpass' } });
    component.find('.SignUp__Input--WithBtn')
      .simulate('change', { target: { value: 'testpass' } });
    component.find('.SignUp__Btn').simulate('click');

    const actions = store.getActions();
    expect(actions).to.deep.equal([signUp({
      invitation_code: 'testinv',
      login: 'testlogin',
      email: 'testemail',
      password: 'testpass',
      password_confirmation: 'testpass',
    })]);
  });

  it('displays errors', () => {
    const store = mockStore({
      auth: Map({
        signUpErrors: Map({
          error: Map({
            errors: Map({
              user: Map({ login: ['Test error!!!'] }),
            }),
          }),
        }),
      }),
    });
    const component = render(<SignUp store={store} />);
    expect(component.find('.SignUp__Input--Error[placeholder="Login"] + .SignUp__InputErrorMessages').text())
      .to.equal('Test error!!!');
  });
});
