import { InterviewDTO } from './interviews.dto';

export interface InterviewService {
  getAll(): Promise<InterviewDTO[]>;
  getById(id: string): Promise<InterviewDTO>;
}
