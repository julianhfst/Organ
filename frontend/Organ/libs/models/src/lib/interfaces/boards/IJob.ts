export interface IJob {
  id: number;
  definition: string;
  status: number;
  board_id: number;
}

export class Job implements IJob {
  id: number;
  definition: string;
  status: number;
  board_id: number;

  constructor(
    id: number,
    definition: string,
    status: number,
    board_id: number
  ) {
    this.id = id;
    this.definition = definition;
    this.status = status;
    this.board_id = board_id;
  }
}
