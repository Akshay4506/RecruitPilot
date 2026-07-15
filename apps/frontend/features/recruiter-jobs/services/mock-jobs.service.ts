import { JobService } from './jobs.service';
import { JobDTO } from './jobs.dto';

export const mockJobService: JobService = {
  getAll: async () => {
    return []; // Return mock data here
  },
  getById: async (id: string) => {
    return { id };
  }
};
