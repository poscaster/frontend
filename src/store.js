import { createStore } from 'redux';
import reducer from './modules';

export default function makeStore() {
  const store = createStore(reducer);

  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextReducer = require('./modules'); // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
