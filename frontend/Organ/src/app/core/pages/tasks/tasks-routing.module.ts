import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

import { TasksPageComponent } from './tasks-page/tasks-page.component';

const routes: Routes = [
  { path: '', component: TasksPageComponent },
  { path: 'detail/:id', component: TaskDetailComponent },
  { path: 'create', component: TaskCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
