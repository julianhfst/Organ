import { formatDate } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ITask,
  ITaskCreate,
  TaskFormButtons,
  TaskFormButtonsType,
  TaskFormType,
} from 'libs/models/src';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnInit {
  @Input() Task: ITask | null = null;
  @Input() TaskFormType: TaskFormType = 'Get';
  @Output() SubmitEvent: EventEmitter<ITaskCreate> = new EventEmitter();
  @Output() Abortevent = new EventEmitter();
  ButtonTexts!: TaskFormButtonsType;
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ButtonTexts = TaskFormButtons[this.TaskFormType];

    if (this.Task && this.TaskFormType == 'Get') {
      this.Task.creationDate = formatDate(
        this.Task.creationDate,
        'dd. MMMM, y, H:mm',
        'de-DE'
      );

      this.taskForm = this.fb.group({
        title: [this.Task.title, [Validators.required]],
        definition: [this.Task.definition, [Validators.required]],
        date: [this.Task.date, [Validators.required]],
        state: [this.GetTaskStateOfString, [Validators.required]],
      });
    } else {
      this.taskForm = this.fb.group({
        title: ['', [Validators.required]],
        definition: ['', [Validators.required]],
        date: ['', [Validators.required]],
        state: ['Not Done', [Validators.required]],
      });
    }
  }

  private get GetTaskStateOfString() {
    const x = this.Task?.done;
    if (x) return 'Done';
    else return 'Not Done';
  }

  private get GetTaskState() {
    if (this.state && this.state.value == 'Not Done') return false;
    else return true;
  }

  get title() {
    return this.taskForm.get('title');
  }

  get definition() {
    return this.taskForm.get('definition');
  }

  get date() {
    return this.taskForm.get('date');
  }

  get state() {
    return this.taskForm.get('state');
  }

  ClickSubmit() {
    const newTask: ITaskCreate = {
      name: this.title?.value,
      definition: this.definition?.value,
      date: this.date?.value,
      done: this.GetTaskState,
    };

    this.SubmitEvent.emit(newTask);
  }
}
