export interface ITask {
  id: number;
  title: string;
  definition: string;
  date: string;
  done: boolean;
  creationDate: string;
}

export class Task {
  id: number;
  title: string;
  definition: string;
  date: string;
  done: boolean;
  creationDate: string;

  constructor(
    id: number,
    title: string,
    definiton: string,
    date: string,
    done: boolean,
    creationDate: string
  ) {
    this.id = id;
    this.title = title;
    this.definition = definiton;
    this.date = date;
    this.done = done;
    this.creationDate = creationDate;
  }
}
