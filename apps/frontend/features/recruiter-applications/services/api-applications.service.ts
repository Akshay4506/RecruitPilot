import { ApplicationService } from './applications.service';
import { ApplicationDTO } from './applications.dto';

export const apiApplicationService: ApplicationService = {
  getAll: async () => {
    throw new Error('Not implemented');
  },
  getById: async (id: string) => {
    throw new Error('Not implemented');
  }
};
