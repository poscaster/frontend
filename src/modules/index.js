import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import counter from './counter';
import layout from './layout';
import subscriptions from './subscriptions';

export default combineReducers({
  routing: routerReducer,
  auth,
  subscriptions,
  counter,
  layout,
}, undefined);
