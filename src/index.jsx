/* global document */
import { createBrowserHistory } from 'history';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import makeStore from './store';
import App from './components/App/App';
import Home from './components/Home/Home';
import './stylesheets/styles.sass';

const store = makeStore();

const history = syncHistoryWithStore(createBrowserHistory(), store);

const routes = (
  <App>
    <Route path="/" component={Home} />
  </App>
);


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app'),
);
