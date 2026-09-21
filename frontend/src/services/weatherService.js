import apiClient, { IS_DEMO_MODE } from './api';
import { mockService } from './mockService';

export const weatherService = {
  async getWeather(scenarioId = 'NORMAL') {
    if (IS_DEMO_MODE) {
      return mockService.getWeatherData(scenarioId);
    }
    return apiClient.get('/weather?lat=18.5204&lng=73.8567');
  },
};
