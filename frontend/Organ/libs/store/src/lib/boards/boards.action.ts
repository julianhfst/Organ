import { createAction, props } from '@ngrx/store';
import { IBoard, IJob } from 'libs/models/src';

export const loadBoards = createAction(
  '[Boards] LoadBoards',
  props<{ boards: IBoard[] }>()
);

export const createBoard = createAction(
  '[Boards] CreateBoard',
  props<{ board: IBoard }>()
);

export const deleteBoard = createAction(
  '[Boards] DeleteBoard',
  props<{ board: IBoard }>()
);

export const updateJob = createAction(
  '[Boards] UpdateJob',
  props<{ job: IJob }>()
);

export const createJob = createAction(
  '[Boards] CreateJob',
  props<{ job: IJob }>()
);

export const deleteJob = createAction(
  '[Boards] DeleteJob',
  props<{ job: IJob }>()
);

export const unloadBoards = createAction('[Boards] unloadBoards');
