import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import counter from './counter';
import layout from './layout';

export default combineReducers({
  routing: routerReducer,
  auth,
  counter,
  layout
}, undefined);
