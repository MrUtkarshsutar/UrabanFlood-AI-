/**
 * Nowcasting Time-Series Data (0 to 60 Minutes)
 * Dynamic projections keyed to simulation state.
 */
export const getForecastDataForScenario = (scenarioId) => {
  const baselines = {
    NORMAL: {
      initialRain: 18,
      initialLevel: 1.20,
      rainDelta: [0, 2, 1, -2, -4],
      levelDelta: [0, 0.05, 0.08, 0.06, 0.04],
      dominantRisk: 'LOW',
      confidence: 96.4,
    },
    HEAVY_RAIN: {
      initialRain: 48,
      initialLevel: 1.90,
      rainDelta: [0, 8, 14, 10, 6],
      levelDelta: [0, 0.12, 0.24, 0.32, 0.38],
      dominantRisk: 'MODERATE',
      confidence: 94.8,
    },
    FLOOD_RISK: {
      initialRain: 72,
      initialLevel: 2.45,
      rainDelta: [0, 16, 22, 18, 12],
      levelDelta: [0, 0.18, 0.35, 0.48, 0.58],
      dominantRisk: 'HIGH',
      confidence: 92.1,
    },
    CRITICAL: {
      initialRain: 105,
      initialLevel: 3.15,
      rainDelta: [0, 18, 25, 30, 20],
      levelDelta: [0, 0.25, 0.48, 0.65, 0.78],
      dominantRisk: 'CRITICAL',
      confidence: 90.5,
    },
  };

  const base = baselines[scenarioId] || baselines.NORMAL;
  const timeLabels = ['Now (0m)', '+15 min', '+30 min', '+45 min', '+60 min'];

  const timeline = timeLabels.map((time, idx) => {
    const rain = Math.max(5, Math.round(base.initialRain + (base.rainDelta[idx] || 0)));
    const level = Number((base.initialLevel + (base.levelDelta[idx] || 0)).toFixed(2));
    let risk = 'LOW';
    if (level >= 2.80 || rain >= 85) risk = 'CRITICAL';
    else if (level >= 2.20 || rain >= 60) risk = 'HIGH';
    else if (level >= 1.60 || rain >= 35) risk = 'MODERATE';

    return {
      time,
      minutes: idx * 15,
      rainfallMmHr: rain,
      waterLevelM: level,
      dangerThresholdM: 2.80,
      warningThresholdM: 2.20,
      riskLevel: risk,
      affectedAreaSqKm: (2.4 + (idx * (scenarioId === 'CRITICAL' ? 3.8 : 1.1))).toFixed(1),
      confidencePercent: Math.max(85, Math.round((base.confidence - (idx * 1.2)) * 10) / 10),
    };
  });

  return {
    scenarioId,
    confidencePercent: base.confidence,
    dangerMarkM: 2.80,
    timeline,
  };
};
