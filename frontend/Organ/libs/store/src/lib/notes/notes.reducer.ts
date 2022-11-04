import { Action, createReducer, on } from '@ngrx/store';
import { INote } from 'libs/models/src';
import {
  createNote,
  deleteNote,
  loadNotes,
  unloadNotes,
  updateNote,
} from './notes.actions';

export interface NotesState {
  Notes: INote[];
  loaded: boolean;
}

export const initialNotesState: NotesState = {
  Notes: [],
  loaded: false,
};

export const _notesReducer = createReducer(
  initialNotesState,
  on(loadNotes, (state, { notes }) => ({
    ...state,
    Notes: notes,
    loaded: true,
  })),
  on(unloadNotes, (state) => ({
    ...state,
    Notes: [],
    loaded: false,
  })),
  on(updateNote, (state, { note }) => {
    const updatedNotes = state.Notes.map((item) => {
      return note.id == item.id ? note : item;
    });
    return {
      ...state,
      Notes: updatedNotes,
      loaded: true,
    };
  }),
  on(deleteNote, (state, { note }) => {
    const updatedNotes = state.Notes.filter((item) => {
      return item.id !== note.id;
    });
    return {
      ...state,
      Notes: updatedNotes,
      loaded: true,
    };
  }),
  on(createNote, (state, { note }) => {
    const updatedNotes = state.Notes.concat(note);
    return {
      ...state,
      Notes: updatedNotes,
      loaded: true,
    };
  })
);

export function notesReducer(state: NotesState | undefined, action: Action) {
  console.log('🎯', action.type, state);
  return _notesReducer(state, action);
}

// export function notesReducer(
//   state = initialNotesState,
//   action: Action
// ): NotesState {
//   switch (action.type) {
//     case loadNotes: {
//       return {
//         ...state,
//         home: state.home + 1,
//       };
//     }

//     default: {
//       return state;
//     }
//   }
// }
