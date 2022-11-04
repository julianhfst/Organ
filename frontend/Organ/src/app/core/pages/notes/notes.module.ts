import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesPageComponent } from './notes-page/notes-page.component';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesItemComponent } from './notes-item/notes-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'components';

@NgModule({
  declarations: [NotesPageComponent, NotesItemComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class NotesModule {}
