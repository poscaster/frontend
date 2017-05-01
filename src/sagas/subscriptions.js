import { takeEvery } from 'redux-saga';
import { apply, call, put, select } from 'redux-saga/effects';
import API from '../api';
import { getJWT } from '../modules/auth';
import { ADD_SUBSCRIPTION } from '../modules/subscriptions';

export function* addSubscriptionAsync({ url }) {
  const jwt = yield select(getJWT);
  const response = yield call(API.addSubscription, { url }, { jwt });

  if (response.status >= 200 && response.status < 300) {
    alert(`Subscription ${url} added`);
  } else {
    alert(`Error adding subscription ${url}`);
  }
}

function* addSubscriptionSaga() {
  yield* takeEvery(ADD_SUBSCRIPTION, addSubscriptionAsync);
}

export default function subscriptionsSagas() {
  return [
    addSubscriptionSaga(),
  ];
}
