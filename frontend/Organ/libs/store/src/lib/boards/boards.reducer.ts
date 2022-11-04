import { Action, createReducer, on } from '@ngrx/store';
import { IBoard } from 'libs/models/src';
import {
  createBoard,
  createJob,
  deleteBoard,
  deleteJob,
  loadBoards,
  unloadBoards,
  updateJob,
} from './boards.action';

export interface BoardsState {
  Boards: IBoard[];
  loaded: boolean;
}

export const initialBoardsState: BoardsState = {
  Boards: [],
  loaded: false,
};

export const _boardsReducer = createReducer(
  initialBoardsState,
  on(loadBoards, (state, { boards }) => ({
    ...state,
    Boards: boards,
    loaded: true,
  })),
  on(unloadBoards, (state) => ({
    ...state,
    Boards: [],
    loaded: false,
  })),
  on(createBoard, (state, { board }) => {
    const updatedBoards = state.Boards.concat(board);
    return {
      ...state,
      Boards: updatedBoards,
      loaded: true,
    };
  }),
  on(deleteBoard, (state, { board }) => {
    const updatedBoards = state.Boards.filter((item) => {
      return item.id !== board.id;
    });
    return {
      ...state,
      Boards: updatedBoards,
      loaded: true,
    };
  }),
  on(updateJob, (state, { job }) => {
    const updatedBoards = state.Boards.map((boarditem) => {
      if (job.board_id == boarditem.id) {
        return {
          ...boarditem,
          jobs: boarditem.jobs.map((jobitem) => {
            return job.id == jobitem.id ? job : jobitem;
          }),
        };
      } else return boarditem;
    });
    return {
      ...state,
      Boards: updatedBoards,
      loaded: true,
    };
  }),
  on(deleteJob, (state, { job }) => {
    const updatedBoards = state.Boards.map((boarditem) => {
      if (job.board_id == boarditem.id) {
        return {
          ...boarditem,
          jobs: boarditem.jobs.filter((jobitem) => {
            return jobitem.id != job.id;
          }),
        };
      } else return boarditem;
    });
    return {
      ...state,
      Boards: updatedBoards,
      loaded: true,
    };
  }),
  on(createJob, (state, { job }) => {
    const updatedBoards = state.Boards.map((boarditem) => {
      if (job.board_id == boarditem.id) {
        return {
          ...boarditem,
          jobs: boarditem.jobs.concat(job),
        };
      } else return boarditem;
    });
    return {
      ...state,
      Boards: updatedBoards,
      loaded: true,
    };
  })
);

export function boardsReducer(state: BoardsState | undefined, action: Action) {
  console.log('🎯', action.type, state);
  return _boardsReducer(state, action);
}
