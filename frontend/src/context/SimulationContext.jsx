import React, { createContext, useContext, useState, useEffect } from 'react';
import { SIMULATION_SCENARIOS, RISK_LEVELS } from '../utils/constants';
import { floodService } from '../services/floodService';
import { alertService } from '../services/alertService';
import { getZonesWithScenarioRisk } from '../data/demoScenario';
import { getLatestSnapshot } from '../utils/storage';

const SimulationContext = createContext(null);

export const SimulationProvider = ({ children }) => {
  const [scenarioId, setScenarioId] = useState('NORMAL');
  const [statusData, setStatusData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [zones, setZones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [audioSirenEnabled, setAudioSirenEnabled] = useState(false);

  const scenarioOrder = ['NORMAL', 'HEAVY_RAIN', 'FLOOD_RISK', 'CRITICAL'];

  // Load data whenever scenario changes
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const loadScenarioData = async () => {
      try {
        const [statusRes, alertsRes] = await Promise.all([
          floodService.getCurrentStatus(scenarioId),
          alertService.getAlerts(scenarioId),
        ]);

        if (isMounted) {
          setStatusData(statusRes);
          setAlerts(alertsRes);
          setZones(getZonesWithScenarioRisk(scenarioId));
          setIsLoading(false);
        }
      } catch (err) {
        console.warn('Falling back to cached snapshot:', err);
        const cached = getLatestSnapshot();
        if (isMounted && cached) {
          setStatusData(cached);
          setIsLoading(false);
        }
      }
    };

    loadScenarioData();

    return () => {
      isMounted = false;
    };
  }, [scenarioId]);

  const setScenario = (newScenarioId) => {
    if (SIMULATION_SCENARIOS[newScenarioId]) {
      setScenarioId(newScenarioId);
    }
  };

  const nextScenario = () => {
    const currentIndex = scenarioOrder.indexOf(scenarioId);
    const nextIndex = (currentIndex + 1) % scenarioOrder.length;
    setScenarioId(scenarioOrder[nextIndex]);
  };

  const activeScenario = SIMULATION_SCENARIOS[scenarioId] || SIMULATION_SCENARIOS.NORMAL;

  return (
    <SimulationContext.Provider
      value={{
        scenarioId,
        activeScenario,
        statusData,
        alerts,
        zones,
        isLoading,
        setScenario,
        nextScenario,
        scenarioOrder,
        audioSirenEnabled,
        setAudioSirenEnabled,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
