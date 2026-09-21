import { RISK_LEVELS } from './constants';

/**
 * Deterministic calculation for urban flood risk
 * Incorporates rainfall, water level, baseline ward elevation, and drainage congestion.
 * 
 * @param {Object} params
 * @param {number} params.rainfallMmHr - Rainfall rate in mm/hr
 * @param {number} params.waterLevelM - River/stream gauge in meters
 * @param {number} params.elevationM - Elevation above sea level in meters
 * @param {number} params.drainageCongestion - Congestion score [0..1]
 * @param {number} params.dangerThresholdM - Danger mark threshold in meters (default: 2.8)
 * @returns {{ riskScore: number, riskLevel: string, depthEstCm: number, factors: Object }}
 */
export const calculateFloodRisk = ({
  rainfallMmHr = 20,
  waterLevelM = 1.2,
  elevationM = 560,
  drainageCongestion = 0.3,
  dangerThresholdM = 2.8,
}) => {
  // Normalize rainfall (0 to 120 mm/hr) -> weight 0.35
  const rainNorm = Math.min(1, Math.max(0, rainfallMmHr / 100));
  
  // Normalize river level relative to danger mark (0.8m to 3.5m) -> weight 0.40
  const riverNorm = Math.min(1, Math.max(0, (waterLevelM - 0.8) / (dangerThresholdM - 0.8 + 0.5)));
  
  // Elevation penalty for low-lying areas (< 555m Pune datum) -> weight 0.15
  const elevationPenalty = Math.max(0, Math.min(1, (565 - elevationM) / 15));
  
  // Drainage congestion score -> weight 0.10
  const drainWeight = drainageCongestion;

  // Composite risk score [0..1]
  const compositeScore = (rainNorm * 0.35) + (riverNorm * 0.40) + (elevationPenalty * 0.15) + (drainWeight * 0.10);
  const roundedScore = Math.round(Math.min(0.99, Math.max(0.05, compositeScore)) * 100) / 100;

  // Determine risk category based on thresholds (aligned with docs/architecture/working-flow.md)
  let riskLevel = RISK_LEVELS.LOW;
  if (roundedScore >= 0.82 || waterLevelM >= dangerThresholdM) {
    riskLevel = RISK_LEVELS.CRITICAL;
  } else if (roundedScore >= 0.60) {
    riskLevel = RISK_LEVELS.HIGH;
  } else if (roundedScore >= 0.32) {
    riskLevel = RISK_LEVELS.MODERATE;
  }

  // Estimated surface waterlogging depth (cm)
  let depthEstCm = 0;
  if (riskLevel === RISK_LEVELS.CRITICAL) {
    depthEstCm = Math.round(35 + (roundedScore * 30));
  } else if (riskLevel === RISK_LEVELS.HIGH) {
    depthEstCm = Math.round(18 + (roundedScore * 18));
  } else if (riskLevel === RISK_LEVELS.MODERATE) {
    depthEstCm = Math.round(5 + (roundedScore * 12));
  } else {
    depthEstCm = Math.round(roundedScore * 5);
  }

  return {
    riskScore: roundedScore,
    riskLevel,
    depthEstCm,
    factors: {
      rainfallScore: Math.round(rainNorm * 100) / 100,
      riverStageScore: Math.round(riverNorm * 100) / 100,
      elevationPenalty: Math.round(elevationPenalty * 100) / 100,
      drainageCongestion: Math.round(drainWeight * 100) / 100,
    }
  };
};
