import { ApplicationDTO } from './applications.dto';

export interface ApplicationService {
  getAll(): Promise<ApplicationDTO[]>;
  getById(id: string): Promise<ApplicationDTO>;
}
