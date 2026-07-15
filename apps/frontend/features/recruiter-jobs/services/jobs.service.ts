import { JobDTO } from './jobs.dto';

export interface JobService {
  getAll(): Promise<JobDTO[]>;
  getById(id: string): Promise<JobDTO>;
}
