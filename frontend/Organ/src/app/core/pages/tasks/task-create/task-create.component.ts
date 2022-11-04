import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from 'api';
import { ITaskCreate } from 'libs/models/src';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCreateComponent implements OnInit {
  constructor(private taskService: TasksService, private router: Router) {}

  ngOnInit(): void {}

  CreateTask(task: ITaskCreate) {
    this.taskService.CreateTask(task).subscribe({
      next: (res) => {
        this.router.navigateByUrl('tasks');
      },
    });
  }

  GoBack() {
    this.router.navigateByUrl('tasks');
  }
}
