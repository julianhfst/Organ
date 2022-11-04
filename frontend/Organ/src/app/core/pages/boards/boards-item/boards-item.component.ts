import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { formatDate } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IBoard, IJob, IJobCreate, IJobMove, JobStatus } from 'libs/models/src';

@Component({
  selector: 'app-boards-item',
  templateUrl: './boards-item.component.html',
  styleUrls: ['./boards-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsItemComponent {
  private board: IBoard | undefined;
  jobStatus = JobStatus;
  @Output() CreateBoardEvent: EventEmitter<string> = new EventEmitter();
  @Output() DeleteBoardEvent: EventEmitter<number> = new EventEmitter();
  @Output() MoveJobEvent: EventEmitter<IJobMove> = new EventEmitter();
  @Output() DeleteJobEvent: EventEmitter<IJob> = new EventEmitter();
  @Output() CreateJobEvent: EventEmitter<IJobCreate> = new EventEmitter();

  boardTitleInput = new FormControl('', Validators.required);
  newJobInput = new FormControl('', Validators.required);
  newJobExpanded = false;

  @Input() set Board(value: IBoard | undefined) {
    if (value)
      this.board = {
        ...value,
        creationDate: formatDate(
          value.creationDate,
          'dd. MMMM, y, H:mm',
          'de-DE'
        ),
      };
    else this.board = undefined;
  }

  get Board(): IBoard | undefined {
    return this.board;
  }

  drop(event: CdkDragDrop<IJob[]>, status: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.Board!.jobs = event.container.data.concat(
        this.Board!.jobs.filter((item) => !event.container.data.includes(item))
      );
    } else {
      this.Board!.jobs = this.Board!.jobs.filter(
        (item) => item != event.item.data
      );
      this.Board!.jobs.push({ ...event.item.data, status: status }); //add updated job
      this.moveJob(event.item.data, status);
    }
  }

  clickExpand() {
    this.newJobExpanded = !this.newJobExpanded;
  }

  moveJob(job: IJob, status: JobStatus) {
    this.MoveJobEvent.emit({ id: job.board_id, jobId: job.id, status });
  }

  clickCreateBoard() {
    if (this.boardTitleInput.value) {
      this.CreateBoardEvent.emit(this.boardTitleInput.value);
      this.boardTitleInput.setValue('');
    }
  }

  clickDeleteBoard() {
    if (this.Board) this.DeleteBoardEvent.emit(this.Board.id);
  }

  clickCreateJob() {
    this.CreateJobEvent.emit({
      boardid: this.Board!.id,
      definition: this.newJobInput.value!,
    });
    this.newJobInput.setValue('');
    this.newJobExpanded = false;
  }

  constructor() {}
}
