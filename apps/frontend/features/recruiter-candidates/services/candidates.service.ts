import { CandidateDTO } from './candidates.dto';

export interface CandidateService {
  getAll(): Promise<CandidateDTO[]>;
  getById(id: string): Promise<CandidateDTO>;
}
