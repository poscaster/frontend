/* global document */
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import makeStore from './store';
import App from './components/App/App';
import Home from './components/Home/Home';
import './stylesheets/styles.sass';

const store = makeStore();

const history = syncHistoryWithStore(browserHistory, store);

const routes = (
  <Route component={App}>
    <Route path="/" component={Home} />
  </Route>
);


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app'),
);
