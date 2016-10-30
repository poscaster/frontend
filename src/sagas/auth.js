/* global API_BASE, fetch */
import { takeEvery } from 'redux-saga';
import { apply, call, put } from 'redux-saga/effects';
import { SIGN_IN_REQUESTED, signInSuccess, signInError } from '../modules/auth';

function* signInAsync({ user }) {
  const response = yield call(fetch, `${API_BASE}/sessions`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  });

  if (response.status >= 200 && response.status < 300) {
    console.dir(response);
    const data = yield apply(response, response.json);
    console.dir(data);
    yield put(signInSuccess(data));
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    yield put(signInError(error));
  }
}

function* signInSaga() {
  yield* takeEvery(SIGN_IN_REQUESTED, signInAsync);
}

export default function authSagas() {
  return [signInSaga()];
}
