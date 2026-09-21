import { useState, useEffect } from 'react';
import { weatherService } from '../services/weatherService';
import { useSimulation } from '../context/SimulationContext';

export const useWeather = () => {
  const { scenarioId } = useSimulation();
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchWeather = async () => {
      try {
        const res = await weatherService.getWeather(scenarioId);
        if (isMounted) {
          setWeather(res);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Weather load error:', err);
        if (isMounted) setIsLoading(false);
      }
    };
    fetchWeather();
    return () => {
      isMounted = false;
    };
  }, [scenarioId]);

  return { weather, isLoading };
};
