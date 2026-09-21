import { useSimulation } from '../context/SimulationContext';

export const useAlerts = () => {
  const { alerts, isLoading, scenarioId } = useSimulation();

  const criticalCount = alerts.filter((a) => a.severity === 'CRITICAL').length;
  const highCount = alerts.filter((a) => a.severity === 'HIGH').length;
  const mediumCount = alerts.filter((a) => a.severity === 'MEDIUM' || a.severity === 'MODERATE').length;

  return {
    alerts,
    isLoading,
    scenarioId,
    totalCount: alerts.length,
    criticalCount,
    highCount,
    mediumCount,
  };
};
