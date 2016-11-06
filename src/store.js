import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import reducer from './modules';

const sagaMiddleware = createSagaMiddleware();

export default function makeStore() {
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(sagas);

  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextReducer = require('./modules'); // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
