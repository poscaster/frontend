import Cookies from 'js-cookie';
import { takeEvery } from 'redux-saga';
import { apply, call, put, select } from 'redux-saga/effects';
import API from '../api';
import { SIGN_IN_REQUESTED, SIGN_IN_FROM_COOKIE_REQUESTED, SIGN_OUT_REQUESTED,
         SIGN_UP_REQUESTED,
         signInSuccess, signInError,
         signOutSuccess,
         signUpSuccess, signUpError,
         getJWT } from '../modules/auth';

export function* signInAsync({ user }) {
  const response = yield call(API.signIn, { user });

  if (response.status >= 200 && response.status < 300) {
    try {
      const data = yield apply(response, response.json);
      yield put(signInSuccess(data));
    } catch (e) {
      yield put(signInError({ error: e.message, response }));
    }
  } else {
    try {
      const error = yield apply(response, response.json);
      yield put(signInError({
        status: response.statusText,
        error,
        response,
      }));
    } catch (e) {
      yield put(signInError({
        status: response.statusText,
        error: 'Sign In error',
        response,
      }));
    }
  }
}

export function* signInFromCookieAsync() {
  const [jwt, exp] = (Cookies.get('poscaster-auth') || '').split('|');

  if (parseInt(exp, 10) > new Date() / 1000) {
    const response = yield call(API.getSession, null, { jwt });

    if (response.status >= 200 && response.status < 300) {
      try {
        const data = yield apply(response, response.json);
        yield put(signInSuccess(data));
      } catch (e) {
        yield put(signInError({ error: e.message, response }));
      }
    }
  }
}

export function* signOutAsync() {
  const jwt = yield select(getJWT);
  const response = yield call(API.signOut, undefined, { jwt });

  if (response.status >= 200 && response.status < 300) {
    yield put(signOutSuccess());
  }
}

export function* signUpAsync({ user }) {
  const response = yield call(API.signUp, { user });

  if (response.status >= 200 && response.status < 300) {
    try {
      const data = yield apply(response, response.json);
      yield put(signUpSuccess(data));
      yield* signInAsync({ user: { login: user.login, password: user.password } });
    } catch (e) {
      yield put(signUpError({ error: e.message, response }));
    }
  } else {
    try {
      const error = yield apply(response, response.json);
      yield put(signUpError({
        status: response.statusText,
        error,
        response,
      }));
    } catch (e) {
      yield put(signUpError({
        status: response.statusText,
        error: 'Sign Up error',
        response,
      }));
    }
  }
}

function* signInSaga() {
  yield* takeEvery(SIGN_IN_REQUESTED, signInAsync);
}

function* signInFromCookieSaga() {
  yield* takeEvery(SIGN_IN_FROM_COOKIE_REQUESTED, signInFromCookieAsync);
}

function* signOutSaga() {
  yield* takeEvery(SIGN_OUT_REQUESTED, signOutAsync);
}

function* signUpSaga() {
  yield* takeEvery(SIGN_UP_REQUESTED, signUpAsync);
}

export default function authSagas() {
  return [
    signInSaga(),
    signInFromCookieSaga(),
    signOutSaga(),
    signUpSaga(),
  ];
}
