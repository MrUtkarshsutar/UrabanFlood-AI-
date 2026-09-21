import apiClient, { IS_DEMO_MODE } from './api';
import { mockService } from './mockService';

export const floodService = {
  async getCurrentStatus(scenarioId = 'NORMAL') {
    if (IS_DEMO_MODE) {
      return mockService.getCurrentFloodStatus(scenarioId);
    }
    return apiClient.get('/flood-risk');
  },

  async getMapGeoJSON(scenarioId = 'NORMAL') {
    if (IS_DEMO_MODE) {
      return mockService.getFloodMapGeoJSON(scenarioId);
    }
    return apiClient.get('/flood-map');
  },

  async getForecast(scenarioId = 'NORMAL') {
    if (IS_DEMO_MODE) {
      return mockService.getFloodForecast(scenarioId);
    }
    return apiClient.get('/nowcast');
  },

  async getSensors() {
    return mockService.getSensors();
  },
};
