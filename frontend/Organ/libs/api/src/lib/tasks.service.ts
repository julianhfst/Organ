import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask, ITaskApi, ITaskCreate, Task } from 'libs/models/src';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  private MapToTask(obs: Observable<ITaskApi>): Observable<ITask> {
    return obs.pipe(
      map((res) => ({
        id: res.pS_Task_Id,
        title: res.name,
        definition: res.definition,
        date: res.date,
        done: res.done,
        creationDate: res.creationDate,
      }))
    );
  }

  GetTasks() {
    const url = environment.api_base_url + 'Task';
    return this.http
      .get<ITaskApi[]>(url, {
        responseType: 'json',
      })
      .pipe(
        map((res) => {
          const tasks = res.map(
            (data) =>
              new Task(
                data.pS_Task_Id,
                data.name,
                data.definition,
                data.date,
                data.done,
                data.creationDate
              )
          );
          return tasks;
        })
      );
  }

  GetTask(id: number): Observable<ITask> {
    const url = environment.api_base_url + 'Task/' + id;
    return this.MapToTask(
      this.http.get<ITaskApi>(url, { responseType: 'json' })
    );
  }

  ToggleTask(id: number): Observable<ITask> {
    const url = environment.api_base_url + 'Task/' + id;
    return this.MapToTask(
      this.http.put<ITaskApi>(url, { responseType: 'json' })
    );
  }

  UpdateTask(task: ITaskCreate, id: number) {
    const url = environment.api_base_url + 'Task/Edit/' + id;
    return this.http.put(url, task, { responseType: 'json' });
  }

  DeleteTask(id: number) {
    const url = environment.api_base_url + 'Task/' + id;
    return this.http.delete(url, { responseType: 'json' });
  }

  CreateTask(task: ITaskCreate) {
    const url = environment.api_base_url + 'Task';
    return this.http.post(url, task, { responseType: 'json' });
  }
}
