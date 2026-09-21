import { useState, useEffect } from 'react';
import { shelterService } from '../services/shelterService';

export const useShelters = () => {
  const [shelters, setShelters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await shelterService.getShelters();
        if (isMounted) {
          setShelters(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to load shelters:', err);
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalCapacity = shelters.reduce((acc, s) => acc + s.capacity, 0);
  const totalOccupied = shelters.reduce((acc, s) => acc + s.occupied, 0);
  const availableBeds = Math.max(0, totalCapacity - totalOccupied);
  const occupancyRate = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;

  return {
    shelters,
    isLoading,
    totalCapacity,
    totalOccupied,
    availableBeds,
    occupancyRate,
  };
};
