import { CandidateService } from './candidates.service';
import { CandidateDTO } from './candidates.dto';

export const apiCandidateService: CandidateService = {
  getAll: async () => {
    throw new Error('Not implemented');
  },
  getById: async (id: string) => {
    throw new Error('Not implemented');
  }
};
