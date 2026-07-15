import { AnalyticsService } from './analytics.service';
import { AnalyticsDTO } from './analytics.dto';

export const mockAnalyticsService: AnalyticsService = {
  getAll: async () => {
    return []; // Return mock data here
  },
  getById: async (id: string) => {
    return { id };
  }
};
