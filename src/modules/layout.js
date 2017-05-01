import { Map } from 'immutable';

const TOGGLE_LEFT_MENU = 'poscaster/layout/TOGGLE_LEFT_MENU';
const TOGGLE_LEFT_MENU_ADD_SUBSCRIPTION = 'poscaster/layout/TOGGLE_LEFT_MENU_ADD_SUBSCRIPTION';

const initialState = new Map({ leftMenuExpanded: true, leftMenuAddSubscriptionExpanded: false });

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LEFT_MENU:
      return state.set('leftMenuExpanded', !state.get('leftMenuExpanded'));
    case TOGGLE_LEFT_MENU_ADD_SUBSCRIPTION:
      return state.set('leftMenuAddSubscriptionExpanded', !state.get('leftMenuAddSubscriptionExpanded'));
    default:
      return state;
  }
}

export function toggleLeftMenu() {
  return { type: TOGGLE_LEFT_MENU };
}

export function toggleLeftMenuAddSubscription() {
  return { type: TOGGLE_LEFT_MENU_ADD_SUBSCRIPTION };
}
