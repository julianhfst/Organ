import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BoardsService } from 'api';
import { Board, IBoard, IJob, IJobCreate, IJobMove } from 'libs/models/src';
import {
  createBoard,
  createJob,
  deleteBoard,
  deleteJob,
  loadBoards,
  selectBoardsStatus,
  updateJob,
} from 'store';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsPageComponent implements OnDestroy {
  Boards: IBoard[] | undefined;
  currentBoard: IBoard | undefined = undefined;

  storeSub = this.store
    .pipe(select(selectBoardsStatus))
    .subscribe((response) => {
      if (!response.loaded) {
        this.boardService.GetBoards().subscribe({
          next: (res: Board[]) => {
            this.store.dispatch(loadBoards({ boards: res }));
          },
        });
      } else {
        this.Boards = response.Boards;
        this.changeDetectorRef.markForCheck();
      }
    });

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private boardService: BoardsService,
    private store: Store
  ) {}

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

  changeBoard(id: number | undefined) {
    if (id && this.Boards)
      this.currentBoard = this.Boards.find((board) => board.id == id);
    else this.currentBoard = undefined;
  }

  CreateBoard(title: string) {
    this.boardService.CreateBoard(title).subscribe({
      next: (res: Board) => {
        this.store.dispatch(createBoard({ board: res }));
      },
    });
  }

  DeleteBoard(id: number) {
    this.boardService.DeleteBoard(id).subscribe({
      next: (res: Board) => {
        this.changeBoard(undefined);
        this.store.dispatch(deleteBoard({ board: res }));
      },
    });
  }

  MoveJob(job: IJobMove) {
    this.boardService.MoveJob(job).subscribe({
      next: (res: IJob) => {
        this.store.dispatch(updateJob({ job: res }));
        this.changeBoard(res.board_id);
      },
    });
  }

  CreateJob(newjob: IJobCreate) {
    this.boardService.CreateJob(newjob).subscribe({
      next: (res: IJob) => {
        this.store.dispatch(createJob({ job: res }));
        this.changeBoard(res.board_id);
      },
    });
  }

  DeleteJob(job: IJob) {
    this.boardService.DeleteJob(job.board_id, job.id).subscribe({
      next: (res: IJob) => {
        this.store.dispatch(deleteJob({ job: res }));
        this.changeBoard(res.board_id);
      },
    });
  }
}
