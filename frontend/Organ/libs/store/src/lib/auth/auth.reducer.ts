import { Action, createReducer, on, State } from '@ngrx/store';
import { autoLogin, login, logout } from './auth.actions';

export interface AuthState {
  loggedIn: boolean;
}

export const initialAuthState: AuthState = {
  loggedIn: false,
};

export const _authReducer = createReducer(
  initialAuthState,
  on(login, (state) => ({ ...state, loggedIn: true })),
  on(autoLogin, (state) => ({ ...state, loggedIn: true })),
  on(logout, (state) => ({ ...state, loggedIn: false }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  console.log('🎯', action.type, state);
  return _authReducer(state, action);
}
