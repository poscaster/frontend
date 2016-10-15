import { Map } from 'immutable';

const INCREMENT = 'poscaster/counter/INCREMENT';
const DECREMENT = 'poscaster/counter/DECREMENT';

const initialState = new Map({ count: 0 });

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return state.set('count', state.get('count') + 1);
    case DECREMENT:
      return state.set('count', state.get('count') - 1);
    default:
      return state;
  }
}

export function increment() {
  return { type: INCREMENT };
}

export function decrement() {
  return { type: DECREMENT };
}
