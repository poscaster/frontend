import { expect } from 'chai';
import { Map } from 'immutable';
import { describe, it } from 'mocha';

import authReducer, { getJWT,
                      signIn, signInSuccess, signInError,
                      signOut, signOutSuccess,
                      signUp, signUpSuccess, signUpError,
                    } from '../../src/modules/auth';

describe('authReducer', () => {
  it('has proper initial state', () => {
    expect(authReducer(undefined, {})).to.equal(Map({ user: null }));
  });

  it('handles sign in request', () => {
    const initialState = Map({ signInErrors: 'testErrors' });
    const action = signIn({});
    const nextState = authReducer(initialState, action);
    expect(nextState).to.equal(Map({}));
  });

  it('handles sign in success', () => {
    const initialState = Map({ user: null });
    const action = signInSuccess({ jwt: 'jwt', exp: 'exp', user: { login: 'test' } });
    const nextState = authReducer(initialState, action);
    expect(nextState).to.equal(Map({ jwt: 'jwt', exp: 'exp', user: Map({ login: 'test' }) }));
  });

  it('handles sign in failure', () => {
    const initialState = Map({ jwt: 'jwt', exp: 'exp' });
    const action = signInError({ error: 'test error' });
    const nextState = authReducer(initialState, action);
    expect(nextState).to.equal(Map({ user: null, signInErrors: Map({ error: 'test error' }) }));
  });

  it('handles sign out request', () => {
    const initialState = Map({ user: Map({ jwt: 'jwt', exp: 'exp', login: 'test' }) });
    const action = signOut();
    const nextState = authReducer(initialState, action);
    expect(nextState).to.equal(initialState);
  });

  it('handles sign out success', () => {
    const initialState = Map({ user: Map({ jwt: 'jwt', exp: 'exp', login: 'test' }) });
    const action = signOutSuccess();
    const nextState = authReducer(initialState, action);
    expect(nextState).to.equal(Map({ user: null }));
  });

  it('handles sign up request', () => {
    const initialState = Map({ signUpErrors: Map({ error: 'test error' }) });
    const action = signUp({});
    const nextState = authReducer(initialState, action);
    expect(nextState).to.equal(Map({}));
  });

  it('handles sign up success', () => {
    const initialState = Map({});
    const action = signUpSuccess({ user: { login: 'test' } });
    const nextState = authReducer(initialState, action);
    expect(nextState).to.equal(Map({ signUpUser: Map({ login: 'test' }) }));
  });

  it('handles sign up failure', () => {
    const initialState = Map({});
    const action = signUpError({ error: 'test error' });
    const nextState = authReducer(initialState, action);
    expect(nextState).to.equal(Map({ signUpErrors: Map({ error: 'test error' }) }));
  });
});

describe('getJWT', () => {
  it('retrieves jwt', () => {
    const state = { auth: Map({ jwt: 'jwt' }) };
    expect(getJWT(state)).to.equal('jwt');
  });
});
