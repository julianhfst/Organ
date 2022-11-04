import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Board,
  IBoard,
  IBoardAPI,
  IJob,
  IJobAPI,
  IJobCreate,
  IJobMove,
  Job,
} from 'libs/models/src';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private http: HttpClient) {}

  private MapToBoard(obs: Observable<IBoardAPI>): Observable<IBoard> {
    return obs.pipe(
      map((res) => ({
        id: res.pS_Boards_Id,
        title: res.title,
        creationDate: res.creationDate,
        jobs: res.jobs.map((res) => ({
          id: res.pS_Jobs_Id,
          definition: res.definition,
          status: res.status,
          board_id: res.fK_Board_ID,
        })),
      }))
    );
  }

  private MapToJob(obs: Observable<IJobAPI>): Observable<IJob> {
    return obs.pipe(
      map((res) => ({
        id: res.pS_Jobs_Id,
        definition: res.definition,
        status: res.status,
        board_id: res.fK_Board_ID,
      }))
    );
  }

  GetBoards() {
    const url = environment.api_base_url + 'Boards';
    return this.http
      .get<IBoardAPI[]>(url, {
        responseType: 'json',
      })
      .pipe(
        map((res) => {
          const boards = res.map(
            (dataAPI) =>
              new Board(
                dataAPI.pS_Boards_Id,
                dataAPI.title,
                dataAPI.creationDate,
                dataAPI.jobs.map(
                  (jobAPI) =>
                    new Job(
                      jobAPI.pS_Jobs_Id,
                      jobAPI.definition,
                      jobAPI.status,
                      jobAPI.fK_Board_ID
                    )
                )
              )
          );
          return boards;
        })
      );
  }

  CreateBoard(title: string) {
    const url = environment.api_base_url + 'Boards';
    return this.MapToBoard(
      this.http.post<IBoardAPI>(url, { title: title }, { responseType: 'json' })
    );
  }

  DeleteBoard(id: number) {
    const url = environment.api_base_url + 'Boards/' + id;
    return this.MapToBoard(
      this.http.delete<IBoardAPI>(url, { responseType: 'json' })
    );
  }

  MoveJob(job: IJobMove) {
    const url =
      environment.api_base_url +
      'Boards/' +
      job.id +
      '/Jobs/' +
      job.jobId +
      '/?status=' +
      job.status;
    return this.MapToJob(this.http.put<IJobAPI>(url, { responseType: 'json' }));
  }

  CreateJob(newjob: IJobCreate) {
    const url =
      environment.api_base_url + 'Boards/' + newjob.boardid + '/Jobs/';
    return this.MapToJob(
      this.http.post<IJobAPI>(
        url,
        { definition: newjob.definition },
        { responseType: 'json' }
      )
    );
  }

  DeleteJob(boardid: number, id: number) {
    const url = environment.api_base_url + 'Boards/' + boardid + '/Jobs/' + id;
    return this.MapToJob(
      this.http.delete<IJobAPI>(url, { responseType: 'json' })
    );
  }
}
