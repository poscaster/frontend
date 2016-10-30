import authSagas from './auth';

export default function* rootSaga() {
  yield [
    ...authSagas(),
  ];
}
