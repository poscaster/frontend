import { Map } from 'immutable';

const TOGGLE_LEFT_MENU = 'poscaster/layout/TOGGLE_LEFT_MENU';

const initialState = new Map({ leftMenuExpanded: true });

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LEFT_MENU:
      return state.set('leftMenuExpanded', !state.get('leftMenuExpanded'));
    default:
      return state;
  }
}

export function toggleLeftMenu() {
  return { type: TOGGLE_LEFT_MENU };
}
