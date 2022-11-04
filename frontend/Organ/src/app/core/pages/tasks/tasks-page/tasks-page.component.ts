import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { TasksService } from 'api';
import { ITask } from 'libs/models/src';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPageComponent implements OnInit {
  Tasks!: ITask[];
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private taskService: TasksService
  ) {}

  ngOnInit(): void {
    this.taskService.GetTasks().subscribe({
      next: (res: ITask[]) => {
        this.Tasks = res;
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  ToggleTask(task: ITask) {
    this.taskService.ToggleTask(task.id).subscribe({
      next: (res: ITask) => {
        const index = this.Tasks.findIndex((item) => item.id == task.id);
        this.Tasks[index] = res;
        this.changeDetectorRef.markForCheck();
      },
    });
  }
}
