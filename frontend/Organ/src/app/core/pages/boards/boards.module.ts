import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { ComponentsModule } from 'components';
import { BoardsPageComponent } from './boards-page/boards-page.component';
import { BoardsItemComponent } from './boards-item/boards-item.component';
import { SharedModule } from 'shared';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { JobItemComponent } from './job-item/job-item.component';

@NgModule({
  declarations: [BoardsPageComponent, BoardsItemComponent, JobItemComponent],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
})
export class BoardsModule {}
