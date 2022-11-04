import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NotesService } from 'api';
import { INote, INoteCreate } from 'libs/models/src';
import { createNote, deleteNote, selectNotesStatus, updateNote } from 'store';
import { loadNotes } from 'store';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesPageComponent implements OnDestroy {
  Notes: INote[] | undefined;
  createNoteExpand = false;
  storeSub = this.store
    .pipe(select(selectNotesStatus))
    .subscribe((response) => {
      if (!response.loaded) {
        this.noteService.GetNotes().subscribe({
          next: (res: INote[]) => {
            this.store.dispatch(loadNotes({ notes: res }));
          },
        });
      } else {
        this.Notes = response.Notes;
        this.changeDetectorRef.markForCheck();
      }
    });

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private noteService: NotesService,
    private store: Store
  ) {}

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

  clickCreateNoteExpand() {
    this.createNoteExpand = !this.createNoteExpand;
  }

  private isAnINote(obj: any): obj is INote {
    return 'id' in obj && 'title' in obj && 'content' in obj;
  }

  private isAnINoteCreate(obj: any): obj is INote {
    return 'title' in obj && 'content' in obj;
  }

  UptadeNote(newNote: INote | INoteCreate) {
    if (this.isAnINote(newNote)) {
      this.noteService.UpdateNote(newNote).subscribe({
        next: (res) => {
          this.store.dispatch(updateNote({ note: res }));
        },
      });
    }
  }

  DeleteNote(note: INote) {
    this.noteService.DeleteNote(note.id).subscribe({
      next: (res) => {
        this.store.dispatch(deleteNote({ note: res }));
      },
    });
  }

  CreateNote(newNote: INote | INoteCreate) {
    if (this.isAnINoteCreate(newNote)) {
      this.noteService.CreateNote(newNote).subscribe({
        next: (res) => {
          this.store.dispatch(createNote({ note: res }));
        },
      });
    }
  }
}
