import { useSimulation } from '../context/SimulationContext';

export const useFloodData = () => {
  const { statusData, zones, isLoading, scenarioId, activeScenario } = useSimulation();

  return {
    statusData,
    zones,
    isLoading,
    scenarioId,
    activeScenario,
    dominantRisk: activeScenario.dominantRisk,
    riskScore: activeScenario.riskScore,
    rainfall: activeScenario.rainfallMmHr,
    waterLevel: activeScenario.waterLevelM,
    dangerMark: activeScenario.dangerMarkM,
  };
};
