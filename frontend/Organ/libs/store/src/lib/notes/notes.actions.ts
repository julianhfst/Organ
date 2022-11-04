import { createAction, props } from '@ngrx/store';
import { INote } from 'libs/models/src';

export const loadNotes = createAction(
  '[Notes] LoadNotes',
  props<{ notes: INote[] }>()
);

export const updateNote = createAction(
  '[Notes] UpdateNote',
  props<{ note: INote }>()
);

export const createNote = createAction(
  '[Notes] CreateNote',
  props<{ note: INote }>()
);

export const deleteNote = createAction(
  '[Notes] DeleteNote',
  props<{ note: INote }>()
);

export const unloadNotes = createAction('[Notes] unloadNotes');
