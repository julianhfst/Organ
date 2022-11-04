import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { ComponentsModule } from 'components';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskCreateComponent } from './task-create/task-create.component';

@NgModule({
  declarations: [
    TasksPageComponent,
    TaskItemComponent,
    TaskDetailComponent,
    TaskFormComponent,
    TaskCreateComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
})
export class TasksModule {}
