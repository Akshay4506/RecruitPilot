import { UserDTO } from './users.dto';

export interface UserService {
  getAll(): Promise<UserDTO[]>;
  getById(id: string): Promise<UserDTO>;
}
