export interface ITaskApi {
  pS_Task_Id: number;
  name: string;
  definition: string;
  date: string;
  done: boolean;
  creationDate: string;
  fK_User_ID: number;
}
