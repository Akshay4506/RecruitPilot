import { UserService } from './users.service';
import { UserDTO } from './users.dto';

export const apiUserService: UserService = {
  getAll: async () => {
    throw new Error('Not implemented');
  },
  getById: async (id: string) => {
    throw new Error('Not implemented');
  }
};
