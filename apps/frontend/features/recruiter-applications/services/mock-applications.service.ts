import { ApplicationService } from './applications.service';
import { ApplicationDTO } from './applications.dto';

export const mockApplicationService: ApplicationService = {
  getAll: async () => {
    return []; // Return mock data here
  },
  getById: async (id: string) => {
    return { id };
  }
};
