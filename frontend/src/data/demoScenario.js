import { RISK_LEVELS, SIMULATION_SCENARIOS } from '../utils/constants';
import { ZONES_DATA } from './zones';
import { calculateFloodRisk } from '../utils/riskCalculator';

/**
 * Returns dynamic alerts based on scenario
 */
export const getAlertsForScenario = (scenarioId) => {
  const timestamp = new Date().toISOString();
  
  const allAlerts = {
    NORMAL: [
      {
        id: 'ALT-101',
        title: 'Hydrological Flow Nominal',
        severity: 'LOW',
        location: 'Pune Metropolitan Region',
        ward: 'All Wards',
        issuedAt: timestamp,
        description: 'Mula and Mutha river gauges indicate normal seasonal discharge. All city stormwater culverts functioning within designed capacity.',
        recommendedAction: 'No immediate protective action required. Maintain routine monsoon preparedness.',
        affectedRoads: [],
        status: 'ACTIVE',
        issuer: 'Pune Disaster Management Cell',
      }
    ],
    HEAVY_RAIN: [
      {
        id: 'ALT-201',
        title: 'Waterlogging Advisory: JM Road & Sancheti Subway',
        severity: 'MEDIUM',
        location: 'Shivajinagar',
        ward: 'Ward 8',
        issuedAt: timestamp,
        description: 'Precipitation intensity of 48 mm/hr has caused surface runoff pooling up to 20 cm in low-lying subways.',
        recommendedAction: 'Reduce vehicle speed. Avoid lower subway lanes; utilize elevated flyover.',
        affectedRoads: ['JM Road Underpass', 'Sancheti Hospital Junction'],
        status: 'ACTIVE',
        issuer: 'Traffic & Flood Command Unit',
      },
      {
        id: 'ALT-202',
        title: 'Drainage Saturation Watch: Sarasbaug Canal',
        severity: 'LOW',
        location: 'Swargate',
        ward: 'Ward 15',
        issuedAt: timestamp,
        description: 'Secondary canal margins nearing 75% conveyance volume. Minor roadside pooling expected.',
        recommendedAction: 'Pedestrians advised to avoid unpaved canal side berms.',
        affectedRoads: ['Mitramandal Chowk lane'],
        status: 'ACTIVE',
        issuer: 'Municipal Drainage Dept',
      }
    ],
    FLOOD_RISK: [
      {
        id: 'ALT-301',
        title: 'HIGH FLOOD RISK WARNING: River Bed Road Inundation',
        severity: 'HIGH',
        location: 'Deccan Gymkhana & Mutha Riverbed',
        ward: 'Ward 12',
        issuedAt: timestamp,
        description: 'Water level at Mutha riverbed reached 2.45m. Inundation depth exceeds 40cm along Balgandharva causeway.',
        recommendedAction: 'ROAD CLOSED. Divert via FC Road or Karve Road. Do not attempt to drive through standing water.',
        affectedRoads: ['River Bed Road', 'Z-Bridge Causeway', 'Balgandharva Low Underpass'],
        status: 'ACTIVE',
        issuer: 'UrbanFlood AI Early Warning System',
        emergencyShelterId: 'SH-01',
        shelterName: 'Balgandharva Multipurpose Civic Hall',
      },
      {
        id: 'ALT-302',
        title: 'Inundation Warning: Maldhakka Railway Subway',
        severity: 'HIGH',
        location: 'Station Area',
        ward: 'Ward 7',
        issuedAt: timestamp,
        description: 'Railway underpass inundated to 35cm depth. Heavy silt accumulation reported.',
        recommendedAction: 'Use Pune Station Main Overbridge. Commercial transport prohibited.',
        affectedRoads: ['Maldhakka Underpass', 'Camp Approach Road'],
        status: 'ACTIVE',
        issuer: 'Railway Emergency Cell',
      },
      {
        id: 'ALT-303',
        title: 'Rising Water Alert: Sangamwadi Confluence',
        severity: 'MEDIUM',
        location: 'Sangamwadi',
        ward: 'Ward 9',
        issuedAt: timestamp,
        description: 'Mula-Mutha confluence velocity surging. Embankment clearance down to 60 cm.',
        recommendedAction: 'Riverside slum settlements put on pre-evacuation alert.',
        affectedRoads: ['Boat Club Nullah Margin'],
        status: 'ACTIVE',
        issuer: 'Disaster Rapid Response',
      },
      {
        id: 'ALT-304',
        title: 'Traffic Inundation Divergence',
        severity: 'MEDIUM',
        location: 'Shivajinagar',
        ward: 'Ward 8',
        issuedAt: timestamp,
        description: 'Civil Court subway closed due to stormwater backflow.',
        recommendedAction: 'Use University Flyover for east-west transit.',
        affectedRoads: ['Civil Court Road'],
        status: 'ACTIVE',
        issuer: 'Traffic Police Command',
      },
    ],
    CRITICAL: [
      {
        id: 'ALT-401',
        title: 'CRITICAL FLASH FLOOD WARNING: DANGER MARK BREACHED',
        severity: 'CRITICAL',
        location: 'Mutha & Mula River Basins - Multi-Ward',
        ward: 'Wards 8, 9, 12, 19',
        issuedAt: timestamp,
        description: 'Extreme cloudburst (105 mm/hr). River stage 3.15m (Danger mark: 2.80m). Severe inundation spreading across residential and commercial sectors.',
        recommendedAction: 'MANDATORY EVACUATION: Immediately move to designated high-elevation shelters. Cut off domestic power mains.',
        affectedRoads: ['Balgandharva River Bed Road', 'Sinhagad Road Riverside', 'Z-Bridge', 'Sangam Bridge Road', 'JM Road Underpass', 'Maldhakka Subway'],
        status: 'ACTIVE',
        issuer: 'District Collector & PMC Emergency Operation Center',
        emergencyShelterId: 'SH-05',
        shelterName: 'Kothrud Yashwantrao Chavan Auditorium (High Ground)',
      },
      {
        id: 'ALT-402',
        title: 'CRITICAL EVACUATION ORDER: Sinhagad Road - Ekta Nagar',
        severity: 'CRITICAL',
        location: 'Sinhagad Road',
        ward: 'Ward 19',
        issuedAt: timestamp,
        description: 'Khadakwasla dam spillway discharge escalated to 35,000 cusecs. River overflow depth exceeding 80cm in Ekta Nagar residential societies.',
        recommendedAction: 'Evacuation teams deployed with inflatable boats. Assemble on society terraces or move to Higher Secondary Camp.',
        affectedRoads: ['Ekta Nagar Main Road', 'Vitthalwadi Riverside Lane'],
        status: 'ACTIVE',
        issuer: 'NDRF Battalion 5 & PMC Disaster Cell',
        emergencyShelterId: 'SH-04',
        shelterName: 'Vitthalwadi Higher Secondary Camp',
      },
      {
        id: 'ALT-403',
        title: 'Major Arterial Road Cut-off',
        severity: 'HIGH',
        location: 'Central Pune Confluence',
        ward: 'Ward 9 & 12',
        issuedAt: timestamp,
        description: 'Balgandharva to Shaniwar Wada river link completely submerged (depth > 75cm). Strong cross-currents.',
        recommendedAction: 'Strict vehicle prohibition in force. All bridges except Lakdi Pul monitored by emergency squads.',
        affectedRoads: ['River Road North and South Banks', 'Alka Talkies Chowk Subway'],
        status: 'ACTIVE',
        issuer: 'Traffic Command & Control',
      },
      {
        id: 'ALT-404',
        title: 'Power Substation Precautionary De-energization',
        severity: 'HIGH',
        location: 'Shivajinagar & Deccan',
        ward: 'Ward 8 & 12',
        issuedAt: timestamp,
        description: 'MSEDCL de-energizing 11kV distribution transformers in inundated zones to prevent electrocution hazards.',
        recommendedAction: 'Use emergency battery lights. Report sparking lines to 1912.',
        affectedRoads: [],
        status: 'ACTIVE',
        issuer: 'MSEDCL Emergency Desk',
      },
    ]
  };

  return allAlerts[scenarioId] || allAlerts.NORMAL;
};

/**
 * Recalculate dynamic ward attributes based on scenario
 */
export const getZonesWithScenarioRisk = (scenarioId) => {
  const scenario = SIMULATION_SCENARIOS[scenarioId] || SIMULATION_SCENARIOS.NORMAL;

  return ZONES_DATA.map((zone) => {
    // Individual ward variation
    let localRain = scenario.rainfallMmHr;
    let localWater = scenario.waterLevelM;

    // Confluence and river-side wards experience higher water levels
    if (zone.id === 'ZN-SANGAMWADI' || zone.id === 'ZN-DECCAN' || zone.id === 'ZN-SINHAGAD') {
      localWater += (scenarioId === 'CRITICAL' ? 0.35 : scenarioId === 'FLOOD_RISK' ? 0.20 : 0.05);
    }

    // High elevation wards (Kothrud) drain much faster
    if (zone.id === 'ZN-KOTHRUD') {
      localWater = Math.min(localWater, 1.3);
    }

    const { riskScore, riskLevel, depthEstCm, factors } = calculateFloodRisk({
      rainfallMmHr: localRain,
      waterLevelM: localWater,
      elevationM: zone.elevationM,
      drainageCongestion: zone.drainageCongestion,
      dangerThresholdM: scenario.dangerMarkM,
    });

    return {
      ...zone,
      riskScore,
      riskLevel,
      depthEstCm,
      localRainfallMmHr: Math.round(localRain),
      localWaterLevelM: Number(localWater.toFixed(2)),
      factors,
    };
  });
};
