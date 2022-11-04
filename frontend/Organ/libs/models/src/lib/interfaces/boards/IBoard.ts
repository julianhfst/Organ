import { IJob } from './IJob';

export interface IBoard {
  id: number;
  title: string;
  creationDate: string;
  jobs: IJob[];
}

export class Board implements IBoard {
  id: number;
  title: string;
  creationDate: string;
  jobs: IJob[];

  constructor(id: number, title: string, creationDate: string, jobs: IJob[]) {
    this.id = id;
    this.title = title;
    this.creationDate = creationDate;
    this.jobs = jobs;
  }
}
