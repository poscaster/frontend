import { takeEvery } from 'redux-saga';
import { apply, call, put } from 'redux-saga/effects';
import API from '../api';
import { SIGN_IN_REQUESTED, SIGN_UP_REQUESTED, signInSuccess, signInError, signUpSuccess, signUpError } from '../modules/auth';

function* signInAsync({ user }) {
  const response = yield call(API.signIn, { user });

  if (response.status >= 200 && response.status < 300) {
    const data = yield apply(response, response.json);
    yield put(signInSuccess(data));
  } else {
    const error = yield apply(response, response.json);
    const errorData = {
      status: response.statusText,
      error,
      response,
    };
    yield put(signInError(errorData));
  }
}

function* signUpAsync({ user }) {
  const response = yield call(API.signUp, { user });

  if (response.status >= 200 && response.status < 300) {
    const data = yield apply(response, response.json);
    yield put(signUpSuccess(data));
    yield* signInAsync({ user: { login: user.login, password: user.password } });
  } else {
    const error = yield apply(response, response.json);
    const errorData = {
      status: response.statusText,
      error,
      response,
    };
    yield put(signUpError(errorData));
  }
}

function* signInSaga() {
  yield* takeEvery(SIGN_IN_REQUESTED, signInAsync);
}

function* signUpSaga() {
  yield* takeEvery(SIGN_UP_REQUESTED, signUpAsync);
}

export default function authSagas() {
  return [
    signInSaga(),
    signUpSaga(),
  ];
}
