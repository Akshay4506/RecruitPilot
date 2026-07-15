import { JobService } from './jobs.service';
import { JobDTO } from './jobs.dto';

export const apiJobService: JobService = {
  getAll: async () => {
    throw new Error('Not implemented');
  },
  getById: async (id: string) => {
    throw new Error('Not implemented');
  }
};
