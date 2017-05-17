import { fromJS } from 'immutable';

export const ADD_SUBSCRIPTION = 'poscaster/subscriptions/ADD_SUBSCRIPTION';
export const FETCH_SUBSCRIPTIONS = 'poscaster/subscriptions/FETCH_SUBSCRIPTIONS';
export const SET_SUBSCRIPTIONS = 'poscaster/subscriptions/SET_SUBSCRIPTIONS';

const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SUBSCRIPTIONS:
      return fromJS(action.subscriptions);
    default:
      return state;
  }
}

export function addSubscription(url) {
  return { type: ADD_SUBSCRIPTION, url };
}

export function fetchSubscriptions() {
  return { type: FETCH_SUBSCRIPTIONS };
}

export function setSubscriptions(subscriptions) {
  return { type: SET_SUBSCRIPTIONS, subscriptions };
}
