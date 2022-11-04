import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'api';
import { ITask, ITaskCreate } from 'libs/models/src';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailComponent implements OnInit {
  Task!: ITask;
  paramId!: number;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TasksService
  ) {}

  ngOnInit(): void {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.paramId || this.paramId === 0) {
      this.taskService.GetTask(this.paramId).subscribe({
        next: (res: ITask) => {
          this.Task = res;
          this.changeDetectorRef.markForCheck();
        },
        error: (err) => {
          this.router.navigateByUrl('tasks');
        },
      });
    } else this.router.navigateByUrl('tasks');
  }

  private CheckTaskChanges(newtask: ITaskCreate): boolean {
    const task = this.Task;
    if (
      task.title == newtask.name &&
      task.definition == newtask.definition &&
      task.date == newtask.date &&
      task.done == newtask.done
    )
      return false;
    else return true;
  }

  UpdateTask(task: ITaskCreate) {
    if (this.CheckTaskChanges(task)) {
      this.taskService.UpdateTask(task, this.paramId).subscribe({
        next: (res) => {
          this.router.navigateByUrl('tasks');
        },
      });
    } else this.router.navigateByUrl('tasks');
  }

  DeleteTask() {
    this.taskService.DeleteTask(this.paramId).subscribe({
      next: (res) => {
        this.router.navigateByUrl('tasks');
      },
    });
  }
}
