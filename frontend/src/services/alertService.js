import apiClient, { IS_DEMO_MODE } from './api';
import { mockService } from './mockService';

export const alertService = {
  async getAlerts(scenarioId = 'NORMAL') {
    if (IS_DEMO_MODE) {
      return mockService.getAlerts(scenarioId);
    }
    const response = await apiClient.get('/alerts');
    return response.alerts || [];
  },
};
