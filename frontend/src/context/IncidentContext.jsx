import React, { createContext, useContext, useState, useEffect } from 'react';
import { incidentService } from '../services/incidentService';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

const IncidentContext = createContext(null);

export const IncidentProvider = ({ children }) => {
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOnline } = useOnlineStatus();

  useEffect(() => {
    let isMounted = true;
    const fetchIncidents = async () => {
      try {
        const data = await incidentService.getIncidents();
        if (isMounted) {
          setIncidents(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to load incidents:', err);
        if (isMounted) setIsLoading(false);
      }
    };
    fetchIncidents();
    return () => {
      isMounted = false;
    };
  }, []);

  const submitReport = async (report) => {
    const created = await incidentService.submitIncident(report, isOnline);
    setIncidents((prev) => [created, ...prev]);
    return created;
  };

  const upvoteReport = async (id) => {
    const updated = await incidentService.upvoteIncident(id);
    setIncidents(updated);
  };

  return (
    <IncidentContext.Provider
      value={{
        incidents,
        isLoading,
        submitReport,
        upvoteReport,
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncidents = () => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncidents must be used within an IncidentProvider');
  }
  return context;
};
