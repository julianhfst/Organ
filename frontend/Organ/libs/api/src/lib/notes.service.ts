import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INote, INoteAPI, INoteCreate, Note } from 'libs/models/src';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}

  private MapToNote(obs: Observable<INoteAPI>): Observable<INote> {
    return obs.pipe(
      map((res) => ({
        id: res.pS_Notes_Id,
        title: res.title,
        content: res.content,
      }))
    );
  }

  GetNotes() {
    const url = environment.api_base_url + 'Notes';
    return this.http
      .get<INoteAPI[]>(url, {
        responseType: 'json',
      })
      .pipe(
        map((res) => {
          const notes2 = res.map(
            (data) => new Note(data.pS_Notes_Id, data.title, data.content)
          );
          return notes2;
        })
      );
  }

  UpdateNote(note: INote) {
    const url = environment.api_base_url + 'Notes/' + note.id;
    return this.MapToNote(
      this.http.put<INoteAPI>(url, note, { responseType: 'json' })
    );
  }

  CreateNote(note: INoteCreate) {
    const url = environment.api_base_url + 'Notes';
    return this.MapToNote(
      this.http.post<INoteAPI>(url, note, { responseType: 'json' })
    );
  }

  DeleteNote(id: number) {
    const url = environment.api_base_url + 'Notes/' + id;
    return this.MapToNote(
      this.http.delete<INoteAPI>(url, { responseType: 'json' })
    );
  }
}
