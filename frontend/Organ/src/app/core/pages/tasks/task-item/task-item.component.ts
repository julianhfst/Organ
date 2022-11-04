import { formatDate } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ITask, TaskStateType } from 'libs/models/src';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent implements OnInit {
  @Input() Task!: ITask;
  @Output() ClickToggleTask: EventEmitter<ITask> = new EventEmitter();
  TaskState: TaskStateType = 'Default';
  ButtonText = 'Finish';
  EditUrl = '';

  constructor() {}

  ngOnInit(): void {
    this.EditUrl = '/tasks/detail/' + this.Task.id;

    const expDate = new Date(this.Task.date);
    const nowDate = new Date();

    if (this.Task.done) {
      this.TaskState = 'Done';
      this.ButtonText = 'Unfinished';
    } else if (!this.Task.done && expDate < nowDate)
      this.TaskState = 'Expanded';
    else {
      this.TaskState = 'Default';
      this.ButtonText = 'Finish';
    }

    this.Task.date = formatDate(this.Task.date, 'dd. MMMM, y, H:mm', 'de-DE');
  }

  ChangeButtonText() {}

  ClickTaskButton() {
    this.ClickToggleTask.emit(this.Task);
  }
}
