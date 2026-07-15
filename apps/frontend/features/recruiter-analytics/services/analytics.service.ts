import { AnalyticsDTO } from './analytics.dto';

export interface AnalyticsService {
  getAll(): Promise<AnalyticsDTO[]>;
  getById(id: string): Promise<AnalyticsDTO>;
}
