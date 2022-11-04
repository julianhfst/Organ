import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotesState } from './notes.reducer';

export const selectNotesState = createFeatureSelector<NotesState>('notes');

export const selectNotesStatus = createSelector(
  selectNotesState,
  (state: NotesState) => {
    return { ...state };
  }
);
