import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { INote, INoteCreate, NoteFormType } from 'libs/models/src';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-notes-item',
  templateUrl: './notes-item.component.html',
  styleUrls: ['./notes-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesItemComponent implements OnInit, AfterViewChecked {
  @ViewChild('myTextArea')
  myTextArea: ElementRef<HTMLElement> | undefined;
  @Input() Note: INote | undefined;
  @Output() SubmitEvent: EventEmitter<INote | INoteCreate> = new EventEmitter();
  @Output() AbortEvent: EventEmitter<INote> = new EventEmitter();
  @Input() FormType: NoteFormType = 'Default';
  expanded = false;

  titleInput = new FormControl('', Validators.required);
  contentInput = new FormControl('', Validators.required);

  constructor() {}

  ngAfterViewChecked(): void {
    this.autoheight();
  }

  ngOnInit(): void {
    if (this.Note) {
      this.titleInput.setValue(this.Note.title);
      this.contentInput.setValue(this.Note.content);
    }
  }

  clickExpanded() {
    if (this.FormType == 'Default') this.expanded = !this.expanded;
  }

  clickEdit() {
    if (this.FormType == 'Edit') this.FormType = 'Default';
    else this.FormType = 'Edit';
  }

  private CheckChanges(): boolean {
    if (
      this.Note &&
      this.Note.title == this.titleInput.value &&
      this.Note.content == this.contentInput.value
    )
      return false;
    else return true;
  }

  clickSubmit() {
    if (this.CheckChanges() && this.Note) {
      const newNote: INoteCreate = {
        title: this.titleInput.value ?? this.Note.title,
        content: this.contentInput.value ?? this.Note.content,
      };
      this.SubmitEvent.emit({ ...newNote, id: this.Note.id });
    } else if (
      this.FormType == 'Create' &&
      this.titleInput.value &&
      this.contentInput.value
    ) {
      const newNote: INoteCreate = {
        title: this.titleInput.value,
        content: this.contentInput.value,
      };
      this.SubmitEvent.emit({ ...newNote });
    }
  }

  clickDelete() {
    this.AbortEvent.emit(this.Note);
  }

  autoheight() {
    if (this.myTextArea) {
      let elem = this.myTextArea.nativeElement;
      elem.style.height = 'auto';
      elem.style.height = elem.scrollHeight + 'px';
    }
  }
}
