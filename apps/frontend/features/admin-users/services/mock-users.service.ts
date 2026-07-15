import { UserService } from './users.service';
import { UserDTO } from './users.dto';

export const mockUserService: UserService = {
  getAll: async () => {
    return []; // Return mock data here
  },
  getById: async (id: string) => {
    return { id };
  }
};
