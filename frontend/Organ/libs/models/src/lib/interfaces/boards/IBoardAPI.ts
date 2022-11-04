import { IJobAPI } from './IJobAPI';

export interface IBoardAPI {
  pS_Boards_Id: number;
  title: string;
  creationDate: string;
  fK_User_ID: number;
  jobs: IJobAPI[];
}
