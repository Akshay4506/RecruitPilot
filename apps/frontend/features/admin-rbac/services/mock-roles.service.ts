import { RoleService } from './roles.service';
import { RoleDTO } from './roles.dto';

export const mockRoleService: RoleService = {
  getAll: async () => {
    return []; // Return mock data here
  },
  getById: async (id: string) => {
    return { id };
  }
};
