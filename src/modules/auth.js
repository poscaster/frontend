import { Map } from 'immutable';

export const SIGN_IN_REQUESTED = 'poscaster/auth/SIGN_IN_REQUESTED';
export const SIGN_IN_SUCCEED = 'poscaster/auth/SIGN_IN_SUCCEED';
export const SIGN_IN_FAILED = 'poscaster/auth/SIGN_IN_FAILED';

const initialState = new Map({ user: null });

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCEED:
      return state.merge({
        user: Map(action.user),
        jwt: action.jwt,
        exp: action.exp,
      });
    case SIGN_IN_FAILED:
      return state.set('userErrors', action.errors);
    default:
      return state;
  }
}

export function signIn(user) {
  return { type: SIGN_IN_REQUESTED, user };
}

export function signInSuccess(data) {
  return { type: SIGN_IN_SUCCEED, ...data };
}

export function signInError(errors) {
  return { type: SIGN_IN_FAILED, errors };
}
