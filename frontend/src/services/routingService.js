import { SHELTERS_DATA } from '../data/shelters';

/**
 * Routing Service: computes hazard-evading paths avoiding high/critical flood zones.
 * Prepares clean parameters to connect to backend POST /api/v1/safe-route.
 */

export const PRESET_LOCATIONS = [
  { id: 'LOC-DECCAN', name: 'Deccan Gymkhana (Goodluck Chowk)', coordinates: [18.5175, 73.8415], ward: 'Ward 12' },
  { id: 'LOC-SWARGATE', name: 'Swargate Bus Terminal', coordinates: [18.5018, 73.8584], ward: 'Ward 15' },
  { id: 'LOC-SHIVAJI', name: 'Shivajinagar Station', coordinates: [18.5314, 73.8446], ward: 'Ward 8' },
  { id: 'LOC-KOTHRUD', name: 'Kothrud Karve Statue', coordinates: [18.5074, 73.8077], ward: 'Ward 11' },
  { id: 'LOC-SINHAGAD', name: 'Sinhagad Road (Ekta Nagar)', coordinates: [18.4810, 73.8250], ward: 'Ward 19' },
  { id: 'LOC-STATION', name: 'Pune Junction Railway Station', coordinates: [18.5284, 73.8739], ward: 'Ward 7' },
];

export const calculateSafeRoute = async ({
  originCoords,
  destinationCoords,
  mode = 'driving',
  scenarioId = 'FLOOD_RISK',
}) => {
  // Simulate network latency (150ms)
  await new Promise((res) => setTimeout(res, 150));

  const isFlooded = scenarioId === 'FLOOD_RISK' || scenarioId === 'CRITICAL';

  // Direct Path (Hazardous in intense storm scenarios)
  const directPath = [
    originCoords,
    [originCoords[0] + 0.003, originCoords[1] + 0.002],
    [18.5205, 73.8445], // Riverbed causeway
    [18.5220, 73.8465], // Submerged underpass
    destinationCoords,
  ];

  // AI Safe Route (Bypassing low riverbed via elevated ridge/FC Road)
  const safePath = [
    originCoords,
    [originCoords[0] + 0.001, originCoords[1] - 0.002], // Turn away from river
    [18.5195, 73.8390], // Elevated arterial FC Road
    [18.5245, 73.8405], // High-elevation ridge
    [18.5260, 73.8440], // Overpass descent
    destinationCoords,
  ];

  const blockedRoadsList = isFlooded
    ? [
        { roadName: 'Balgandharva River Bed Road', waterDepthCm: scenarioId === 'CRITICAL' ? 70 : 42, reason: 'Mutha River bank overflow' },
        { roadName: 'Z-Bridge Underpass', waterDepthCm: scenarioId === 'CRITICAL' ? 55 : 30, reason: 'Culvert backsurge' },
      ]
    : [];

  return {
    status: 'success',
    reroutedDueToHazard: isFlooded,
    scenarioId,
    mode,
    // Safe AI recommended path
    safeRoute: {
      distanceMeters: isFlooded ? 3420 : 1950,
      durationSeconds: isFlooded ? 680 : 420, // ~11 mins vs 7 mins
      maxEncounteredRisk: isFlooded ? 'LOW' : 'LOW',
      geometry: {
        type: 'LineString',
        coordinates: safePath,
      },
      segments: [
        {
          step: 1,
          instruction: 'Head west away from river toward FC Road elevated link',
          risk: 'LOW',
          distanceM: 650,
          roadType: 'Elevated Arterial',
          status: 'Clear & Open',
        },
        {
          step: 2,
          instruction: 'Continue north along Fergusson College Ridge Road',
          risk: 'LOW',
          distanceM: 1420,
          roadType: 'High-Elevation Corridor',
          status: 'Clear & Open',
        },
        {
          step: 3,
          instruction: 'Turn right onto Modern College Link Overpass',
          risk: 'LOW',
          distanceM: 850,
          roadType: 'Flyover Overpass',
          status: 'Clear & Open',
        },
        {
          step: 4,
          instruction: 'Arrive at Balgandharva Relief Center safe staging courtyard',
          risk: 'LOW',
          distanceM: 500,
          roadType: 'Civic High Ground',
          status: 'Safe Evacuation Destination',
        },
      ],
    },
    // Hazardous blocked path (for visual comparison)
    hazardousRoute: isFlooded
      ? {
          distanceMeters: 1950,
          durationSeconds: 9999, // impassable
          maxEncounteredRisk: scenarioId === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
          geometry: {
            type: 'LineString',
            coordinates: directPath,
          },
          blockedAt: 'Balgandharva River Bed Road (Inundated 45cm)',
        }
      : null,
    blockedRoads: blockedRoadsList,
  };
};
