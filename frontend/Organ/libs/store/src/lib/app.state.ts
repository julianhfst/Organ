import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { boardsReducer, BoardsState } from './boards';
import { notesReducer, NotesState } from './notes/notes.reducer';

export interface AppState {
  auth: AuthState;
  notes: NotesState;
  boards: BoardsState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  notes: notesReducer,
  boards: boardsReducer,
};
