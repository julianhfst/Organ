import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatus = createSelector(
  selectAuthState,
  (state: AuthState) => {
    return !!state.loggedIn;
  }
);
