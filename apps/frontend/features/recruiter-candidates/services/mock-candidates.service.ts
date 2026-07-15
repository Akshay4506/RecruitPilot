import { CandidateService } from './candidates.service';
import { CandidateDTO } from './candidates.dto';

export const mockCandidateService: CandidateService = {
  getAll: async () => {
    return []; // Return mock data here
  },
  getById: async (id: string) => {
    return { id };
  }
};
