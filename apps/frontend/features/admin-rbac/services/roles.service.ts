import { RoleDTO } from './roles.dto';

export interface RoleService {
  getAll(): Promise<RoleDTO[]>;
  getById(id: string): Promise<RoleDTO>;
}
