// Hazard Levels and Colors
export const RISK_LEVELS = {
  LOW: 'LOW',
  MODERATE: 'MODERATE',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
};

export const RISK_CONFIG = {
  LOW: {
    level: 'LOW',
    label: 'Low Hazard',
    badgeText: 'Low Risk',
    color: '#10B981', // Emerald
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    glowClass: 'shadow-glow-low',
    fillColor: '#10B981',
    description: 'Normal hydrological flow. Runoff within drainage capacity.',
  },
  MODERATE: {
    level: 'MODERATE',
    label: 'Moderate Hazard',
    badgeText: 'Moderate Risk',
    color: '#F59E0B', // Amber
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    glowClass: 'shadow-glow-moderate',
    fillColor: '#F59E0B',
    description: 'Minor waterlogging in low-lying subways and road margins.',
  },
  HIGH: {
    level: 'HIGH',
    label: 'High Hazard',
    badgeText: 'High Risk',
    color: '#F97316', // Orange
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    textColor: 'text-orange-400',
    glowClass: 'shadow-glow-high',
    fillColor: '#F97316',
    description: 'Active inundation threatening transit routes. Evacuation advisory.',
  },
  CRITICAL: {
    level: 'CRITICAL',
    label: 'Critical Warning',
    badgeText: 'Critical Risk',
    color: '#EF4444', // Red
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/40',
    textColor: 'text-red-400',
    glowClass: 'shadow-glow-critical',
    fillColor: '#EF4444',
    description: 'Severe flash flood inundation. Danger mark breached. Evacuate immediately.',
  },
};

// Simulation Scenarios for SIH Live Demo
export const SIMULATION_SCENARIOS = {
  NORMAL: {
    id: 'NORMAL',
    name: 'Normal Monsoon',
    rainfallMmHr: 18,
    precipitation24h: 32,
    waterLevelM: 1.2,
    dangerMarkM: 2.8,
    dominantRisk: RISK_LEVELS.LOW,
    riskScore: 0.18,
    affectedWardsCount: 0,
    activeAlertsCount: 0,
    statusHeadline: 'Normal Flow - All Drainage Clear',
    description: 'Baseline monsoon precipitation. River discharge within safe embankment thresholds.',
  },
  HEAVY_RAIN: {
    id: 'HEAVY_RAIN',
    name: 'Heavy Downpour',
    rainfallMmHr: 48,
    precipitation24h: 84,
    waterLevelM: 1.9,
    dangerMarkM: 2.8,
    dominantRisk: RISK_LEVELS.MODERATE,
    riskScore: 0.52,
    affectedWardsCount: 2,
    activeAlertsCount: 2,
    statusHeadline: 'Advisory: Water Accumulation in Low Subways',
    description: 'Sustained precipitation causing localized storm-drain saturation in low-lying areas.',
  },
  FLOOD_RISK: {
    id: 'FLOOD_RISK',
    name: 'Intense Storm / Inundation',
    rainfallMmHr: 72,
    precipitation24h: 142,
    waterLevelM: 2.45,
    dangerMarkM: 2.8,
    dominantRisk: RISK_LEVELS.HIGH,
    riskScore: 0.78,
    affectedWardsCount: 5,
    activeAlertsCount: 4,
    statusHeadline: 'Inundation Warning: Major Arterial Roads Blocked',
    description: 'Catchment river swelling rapidly. River Road & Central Market waterlogged up to 45cm.',
  },
  CRITICAL: {
    id: 'CRITICAL',
    name: 'Cloudburst & Flash Flood',
    rainfallMmHr: 105,
    precipitation24h: 218,
    waterLevelM: 3.15,
    dangerMarkM: 2.8,
    dominantRisk: RISK_LEVELS.CRITICAL,
    riskScore: 0.94,
    affectedWardsCount: 8,
    activeAlertsCount: 7,
    statusHeadline: 'RED ALERT: Danger Mark Breached (3.15m > 2.80m)',
    description: 'Extreme cloudburst event. Riverside banks overflowing. Immediate shelter evacuation mandatory.',
  },
};

// Shelter Statuses
export const SHELTER_STATUS = {
  AVAILABLE: {
    key: 'AVAILABLE',
    label: 'Available',
    color: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  },
  LIMITED: {
    key: 'LIMITED',
    label: 'Limited Spots',
    color: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  },
  FULL: {
    key: 'FULL',
    label: 'At Capacity',
    color: 'text-red-400',
    badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30',
  },
  CLOSED: {
    key: 'CLOSED',
    label: 'Closed',
    color: 'text-slate-400',
    badgeBg: 'bg-slate-800 text-slate-400 border-slate-700',
  },
};

// Navigation Links
export const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/map', label: 'Live Flood Map', icon: 'Map' },
  { path: '/nowcasting', label: 'Nowcasting', icon: 'TrendingUp' },
  { path: '/alerts', label: 'Alerts', icon: 'AlertTriangle' },
  { path: '/safe-route', label: 'Safe Route', icon: 'Navigation' },
  { path: '/shelters', label: 'Shelters', icon: 'Home' },
  { path: '/incidents', label: 'Report Incident', icon: 'FileWarning' },
  { path: '/about', label: 'System Info', icon: 'Info' },
];

export const MAP_CENTER = [18.5204, 73.8567]; // Pune
export const DEFAULT_ZOOM = 13;
