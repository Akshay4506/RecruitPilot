import { InterviewService } from './interviews.service';
import { InterviewDTO } from './interviews.dto';

export const mockInterviewService: InterviewService = {
  getAll: async () => {
    return []; // Return mock data here
  },
  getById: async (id: string) => {
    return { id };
  }
};
