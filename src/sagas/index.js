import authSagas from './auth';
import subscriptionsSagas from './subscriptions';

export default function* rootSaga() {
  yield [
    ...authSagas(),
    ...subscriptionsSagas()
  ];
}
