import { expect } from 'chai';
import { describe, it, afterEach } from 'mocha';
import { stub } from 'sinon';
import Cookies from 'js-cookie';
import { call, put, select } from 'redux-saga/effects';
import API from '../../src/api';
import { signInSuccess, signInError,
         signOutSuccess,
         signUpSuccess, signUpError,
         getJWT } from '../../src/modules/auth';
import { signInAsync, signInFromCookieAsync, signOutAsync,
         signUpAsync } from '../../src/sagas/auth';

// istanbul ignore next
const noop = () => {};

describe('authSagas', () => {
  describe('signInAsync', () => {
    const user = { login: 'login', password: 'pass' };

    it('calls API signIn successfully', () => {
      const generator = signInAsync({ user });
      let next = generator.next();
      expect(next.value).to.deep.equal(call(API.signIn, { user }));

      generator.next({ status: 200, json: noop });

      next = generator.next({ user });
      expect(next.value).to.deep.equal(put(signInSuccess({ user })));
    });

    it('calls API signIn successfully but json fails', () => {
      const response = { status: 200, json: noop };
      const generator = signInAsync({ user });
      let next = generator.next();
      expect(next.value).to.deep.equal(call(API.signIn, { user }));

      generator.next(response);

      next = generator.throw(new Error('test error'));
      expect(next.value).to.deep.equal(put(signInError({ error: 'test error', response })));
    });

    it('calls API signIn with failure', () => {
      const response = { status: 400, statusText: 'Error', json: noop };
      const generator = signInAsync({ user });
      let next = generator.next();
      expect(next.value).to.deep.equal(call(API.signIn, { user }));

      generator.next(response);

      next = generator.next('test error');
      expect(next.value).to.deep.equal(put(signInError({
        error: 'test error',
        response,
        status: 'Error',
      })));
    });

    it('calls API signIn with failure and response parsing fails', () => {
      const response = { status: 400, statusText: 'Error', json: noop };
      const generator = signInAsync({ user });
      let next = generator.next();
      expect(next.value).to.deep.equal(call(API.signIn, { user }));

      generator.next(response);

      next = generator.throw(new Error('test error'));
      expect(next.value).to.deep.equal(put(signInError({
        error: 'Sign In error',
        response,
        status: 'Error',
      })));
    });
  });

  describe('signInFromCookie', () => {
    const dt = delta => (new Date() / 1000) + delta;

    it('does nothing without cookie', () => {
      stub(Cookies, 'get').returns('');
      const generator = signInFromCookieAsync();
      expect(generator.next()).to.deep.equal({ value: undefined, done: true });
      expect(Cookies.get).to.have.been.calledWith('poscaster-auth');
    });

    it('does nothing with expired jwt', () => {
      stub(Cookies, 'get').returns(`test|${dt(-3600)}`);
      const generator = signInFromCookieAsync();
      expect(generator.next()).to.deep.equal({ value: undefined, done: true });
    });

    it('retrieves stored session', () => {
      stub(Cookies, 'get').returns(`test|${dt(3600)}`);
      const generator = signInFromCookieAsync();
      let next = generator.next();
      expect(next.value).to.deep.equal(call(API.getSession, null, { jwt: 'test' }));
      generator.next({ status: 200, json: noop });
      next = generator.next({});
      expect(next.value).to.deep.equal(put(signInSuccess({})));
      expect(generator.next().done).to.equal(true);
    });

    it('ignores error from server (jwt assumed invalidated)', () => {
      stub(Cookies, 'get').returns(`test|${dt(3600)}`);
      const generator = signInFromCookieAsync();
      const next = generator.next();
      expect(next.value).to.deep.equal(call(API.getSession, null, { jwt: 'test' }));
      generator.next({ status: 401, json: noop });
      expect(generator.next()).to.deep.equal({ value: undefined, done: true });
    });

    it('calls API signIn with failure and response parsing fails', () => {
      const response = { status: 200, json: noop };
      stub(Cookies, 'get').returns(`test|${dt(3600)}`);
      const generator = signInFromCookieAsync();
      let next = generator.next();
      expect(next.value).to.deep.equal(call(API.getSession, null, { jwt: 'test' }));

      generator.next(response);

      next = generator.throw(new Error('test error'));
      expect(next.value).to.deep.equal(put(signInError({
        error: 'test error',
        response,
      })));
      expect(generator.next()).to.deep.equal({ value: undefined, done: true });
    });

    afterEach(() => {
      Cookies.get.restore();
    });
  });

  describe('signOutAsync', () => {
    const jwt = 'jwtstring';

    it('calls API signOut successfully', () => {
      const generator = signOutAsync();
      let next = generator.next();
      expect(next.value).to.deep.equal(select(getJWT));
      next = generator.next(jwt);
      expect(next.value).to.deep.equal(call(API.signOut, undefined, { jwt }));
      next = generator.next({ status: 200 });

      expect(next.value).to.deep.equal(put(signOutSuccess()));
    });

    it('calls API signOut with failure', () => {
      const generator = signOutAsync();
      let next = generator.next();
      expect(next.value).to.deep.equal(select(getJWT));
      next = generator.next(jwt);
      expect(next.value).to.deep.equal(call(API.signOut, undefined, { jwt }));
      next = generator.next({ status: 400 });

      expect(next.value).to.equal(undefined);
    });
  });

  describe('signUpAsync', () => {
    const user = {
      invitation: '1234567',
      login: 'login',
      password: 'pass',
      password_confirmation: 'pass',
    };

    it('calls API signUp successfully', () => {
      const generator = signUpAsync({ user });
      let next = generator.next();
      expect(next.value).to.deep.equal(call(API.signUp, { user }));

      generator.next({ status: 200, json: noop });

      next = generator.next({ user });
      expect(next.value).to.deep.equal(put(signUpSuccess({ user })));
      next = generator.next();
      expect(next.value).to.deep.equal(call(API.signIn, { user: {
        login: user.login,
        password: user.password,
      } }));
    });

    it('calls API signUp successfully but json fails', () => {
      const response = { status: 200, json: noop };
      const generator = signUpAsync({ user });
      let next = generator.next();
      expect(next.value).to.deep.equal(call(API.signUp, { user }));

      generator.next(response);

      next = generator.throw(new Error('test error'));
      expect(next.value).to.deep.equal(put(signUpError({ error: 'test error', response })));
    });

    it('calls API signUp with failure', () => {
      const response = { status: 400, statusText: 'Error', json: noop };
      const generator = signUpAsync({ user });
      let next = generator.next();
      expect(next.value).to.deep.equal(call(API.signUp, { user }));

      generator.next(response);

      next = generator.next('test error');
      expect(next.value).to.deep.equal(put(signUpError({
        error: 'test error',
        response,
        status: 'Error',
      })));
    });

    it('calls API signUp with failure and response parsing fails', () => {
      const response = { status: 400, statusText: 'Error', json: noop };
      const generator = signUpAsync({ user });
      let next = generator.next();
      expect(next.value).to.deep.equal(call(API.signUp, { user }));

      generator.next(response);

      next = generator.throw(new Error('test error'));
      expect(next.value).to.deep.equal(put(signUpError({
        error: 'Sign Up error',
        response,
        status: 'Error',
      })));
    });
  });
});
