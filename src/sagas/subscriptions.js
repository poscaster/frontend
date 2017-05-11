import { takeEvery } from 'redux-saga';
import { apply, call, put, select } from 'redux-saga/effects';
import API from '../api';
import { getJWT } from '../modules/auth';
import { ADD_SUBSCRIPTION, FETCH_SUBSCRIPTIONS, setSubscriptions } from '../modules/subscriptions';

export function* addSubscriptionAsync({ url }) {
  const jwt = yield select(getJWT);
  const response = yield call(API.addSubscription, { url }, { jwt });

  if (response.status >= 200 && response.status < 300) {
    // alert(`Subscription ${url} added`);
  } else {
    // alert(`Error adding subscription ${url}`);
  }
}

export function* fetchSubscriptionsAsync() {
  const jwt = yield select(getJWT);
  const response = yield call(API.fetchSubscriptions, null, { jwt });

  if (response.status >= 200 && response.status < 300) {
    const data = yield apply(response, response.json);
    yield put(setSubscriptions(data.subscriptions));
  } else {
    // Handle error
  }
}

function* addSubscriptionSaga() {
  yield* takeEvery(ADD_SUBSCRIPTION, addSubscriptionAsync);
}

function* fetchSubscriptionsSaga() {
  yield* takeEvery(FETCH_SUBSCRIPTIONS, fetchSubscriptionsAsync);
}

export default function subscriptionsSagas() {
  return [
    addSubscriptionSaga(),
    fetchSubscriptionsSaga(),
  ];
}
