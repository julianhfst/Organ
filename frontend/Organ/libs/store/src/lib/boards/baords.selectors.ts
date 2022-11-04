import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from './boards.reducer';

export const selectBoardsState = createFeatureSelector<BoardsState>('boards');

export const selectBoardsStatus = createSelector(
  selectBoardsState,
  (state: BoardsState) => {
    return { ...state };
  }
);
