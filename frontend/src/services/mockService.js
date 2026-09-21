import { SIMULATION_SCENARIOS, RISK_CONFIG } from '../utils/constants';
import { getZonesWithScenarioRisk } from '../data/demoScenario';
import { getAlertsForScenario } from '../data/demoScenario';
import { getForecastDataForScenario } from '../data/forecasts';
import { SHELTERS_DATA } from '../data/shelters';
import { SENSORS_DATA } from '../data/sensors';
import { INITIAL_INCIDENTS } from '../data/incidents';
import { calculateSafeRoute } from './routingService';
import { saveSnapshot } from '../utils/storage';

/**
 * Mock Service Layer simulating backend responses for SIH Hackathon demonstration.
 * Matches shapes documented in docs/api/api-documentation.md.
 */

export const mockService = {
  // GET /api/v1/flood-risk
  async getCurrentFloodStatus(scenarioId = 'NORMAL') {
    const scenario = SIMULATION_SCENARIOS[scenarioId] || SIMULATION_SCENARIOS.NORMAL;
    const zones = getZonesWithScenarioRisk(scenarioId);
    const alerts = getAlertsForScenario(scenarioId);
    
    // Calculate aggregate metrics
    const highRiskZones = zones.filter((z) => z.riskLevel === 'HIGH' || z.riskLevel === 'CRITICAL');
    const totalPopulationAtRisk = highRiskZones.reduce((acc, z) => acc + z.population, 0);

    const snapshot = {
      scenarioId,
      scenarioName: scenario.name,
      timestamp: new Date().toISOString(),
      dominantRisk: scenario.dominantRisk,
      dominantRiskConfig: RISK_CONFIG[scenario.dominantRisk],
      riskScore: scenario.riskScore,
      rainfallMmHr: scenario.rainfallMmHr,
      precipitation24h: scenario.precipitation24h,
      waterLevelM: scenario.waterLevelM,
      dangerMarkM: scenario.dangerMarkM,
      statusHeadline: scenario.statusHeadline,
      description: scenario.description,
      affectedWardsCount: highRiskZones.length,
      activeAlertsCount: alerts.length,
      populationAtRisk: totalPopulationAtRisk,
      telemetry: {
        sensorsActive: SENSORS_DATA.length,
        networkHealthPercent: 98.4,
        radarSyncTime: '30 seconds ago',
      },
    };

    // Auto cache latest snapshot for offline resilience
    saveSnapshot(snapshot);

    return snapshot;
  },

  // GET /api/v1/weather
  async getWeatherData(scenarioId = 'NORMAL') {
    const scenario = SIMULATION_SCENARIOS[scenarioId] || SIMULATION_SCENARIOS.NORMAL;
    return {
      latitude: 18.5204,
      longitude: 73.8567,
      current: {
        precipitation_mm: scenario.precipitation24h,
        precipitation_intensity_mm_per_hr: scenario.rainfallMmHr,
        temperature_celsius: scenarioId === 'CRITICAL' ? 22.4 : 26.2,
        humidity_percent: scenarioId === 'CRITICAL' ? 98 : 88,
        condition: scenario.name,
        wind_speed_kmh: scenarioId === 'CRITICAL' ? 42 : 16,
      },
    };
  },

  // GET /api/v1/flood-map (GeoJSON Feature Collection)
  async getFloodMapGeoJSON(scenarioId = 'NORMAL') {
    const zones = getZonesWithScenarioRisk(scenarioId);
    return {
      type: 'FeatureCollection',
      features: zones.map((zone) => ({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [zone.boundary],
        },
        properties: {
          zone_id: zone.id,
          ward_number: zone.wardNumber,
          name: zone.name,
          centroid: zone.centroid,
          elevation_m: zone.elevationM,
          slope_deg: zone.slopeDeg,
          risk_level: zone.riskLevel,
          risk_score: zone.riskScore,
          water_depth_cm_est: zone.depthEstCm,
          critical_infrastructure: zone.criticalInfrastructure,
          population: zone.population,
          updated_at: new Date().toISOString(),
        },
      })),
    };
  },

  // GET /api/v1/alerts
  async getAlerts(scenarioId = 'NORMAL') {
    return getAlertsForScenario(scenarioId);
  },

  // GET /api/v1/nowcast (15m, 30m, 45m, 60m)
  async getFloodForecast(scenarioId = 'NORMAL') {
    return getForecastDataForScenario(scenarioId);
  },

  // GET /shelters
  async getShelters() {
    return SHELTERS_DATA;
  },

  // GET /sensors
  async getSensors() {
    return SENSORS_DATA;
  },

  // GET /incidents
  async getIncidents() {
    return INITIAL_INCIDENTS;
  },

  // POST /api/v1/safe-route
  async getSafeRoute(params) {
    return calculateSafeRoute(params);
  },
};
