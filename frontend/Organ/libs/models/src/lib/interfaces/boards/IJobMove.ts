import { JobStatus } from '../../types';

export interface IJobMove {
  id: number;
  jobId: number;
  status: JobStatus;
}
