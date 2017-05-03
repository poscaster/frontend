import { Map, fromJS } from 'immutable';
import Cookies from 'js-cookie';

export const SIGN_IN_FROM_COOKIE_REQUESTED = 'poscaster/auth/SIGN_IN_FROM_COOKIE_REQUESTED';
export const SIGN_IN_REQUESTED = 'poscaster/auth/SIGN_IN_REQUESTED';
export const SIGN_IN_SUCCEED = 'poscaster/auth/SIGN_IN_SUCCEED';
export const SIGN_IN_FAILED = 'poscaster/auth/SIGN_IN_FAILED';
export const SIGN_UP_REQUESTED = 'poscaster/auth/SIGN_UP_REQUESTED';
export const SIGN_UP_SUCCEED = 'poscaster/auth/SIGN_UP_SUCCEED';
export const SIGN_UP_FAILED = 'poscaster/auth/SIGN_UP_FAILED';
export const SIGN_OUT_REQUESTED = 'poscaster/auth/SIGN_OUT_REQUESTED';
export const SIGN_OUT_SUCCEED = 'poscaster/auth/SIGN_OUT_SUCCEED';

const initialState = new Map({ user: null });

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_REQUESTED:
      return state.delete('signInErrors');
    case SIGN_IN_SUCCEED:
      Cookies.set('poscaster-auth', `${action.jwt}|${action.exp}`);
      return state.merge({
        user: Map(action.user),
        jwt: action.jwt,
        exp: action.exp,
      });
    case SIGN_IN_FAILED:
      return state
        .delete('jwt')
        .delete('exp')
        .merge({
          signInErrors: fromJS(action.errors),
          user: null,
        });
    case SIGN_OUT_SUCCEED:
      return state
        .delete('jwt')
        .delete('exp')
        .set('user', null);
    case SIGN_UP_REQUESTED:
      return state.delete('signUpErrors');
    case SIGN_UP_SUCCEED:
      return state.merge({ signUpUser: Map(action.user) });
    case SIGN_UP_FAILED:
      return state.merge({ signUpErrors: fromJS(action.errors) });
    default:
      return state;
  }
}

export function getJWT(state) {
  return state.auth.get('jwt');
}

export function signIn(user) {
  return { type: SIGN_IN_REQUESTED, user };
}

export function signInFromCookie() {
  return { type: SIGN_IN_FROM_COOKIE_REQUESTED };
}

export function signInSuccess(data) {
  return { type: SIGN_IN_SUCCEED, ...data };
}

export function signInError(errors) {
  return { type: SIGN_IN_FAILED, errors };
}

export function signOut() {
  return { type: SIGN_OUT_REQUESTED };
}

export function signOutSuccess() {
  return { type: SIGN_OUT_SUCCEED };
}

export function signUp(user) {
  return { type: SIGN_UP_REQUESTED, user };
}

export function signUpSuccess(data) {
  return { type: SIGN_UP_SUCCEED, ...data };
}

export function signUpError(errors) {
  return { type: SIGN_UP_FAILED, errors };
}
