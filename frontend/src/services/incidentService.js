import { INITIAL_INCIDENTS } from '../data/incidents';
import { getCachedData, setCachedData, queueOfflineIncident, CACHE_KEYS } from '../utils/storage';

export const incidentService = {
  async getIncidents() {
    const cached = getCachedData(CACHE_KEYS.INCIDENTS);
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return cached;
    }
    setCachedData(CACHE_KEYS.INCIDENTS, INITIAL_INCIDENTS);
    return INITIAL_INCIDENTS;
  },

  async submitIncident(newReport, isOnline = true) {
    const reportWithMeta = {
      id: `INC-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      status: isOnline ? 'VERIFIED_PENDING' : 'QUEUED_OFFLINE',
      upvotes: 1,
      ...newReport,
    };

    if (!isOnline) {
      queueOfflineIncident(reportWithMeta);
    }

    const current = await this.getIncidents();
    const updated = [reportWithMeta, ...current];
    setCachedData(CACHE_KEYS.INCIDENTS, updated);

    return reportWithMeta;
  },

  async upvoteIncident(incidentId) {
    const current = await this.getIncidents();
    const updated = current.map((item) =>
      item.id === incidentId ? { ...item, upvotes: (item.upvotes || 0) + 1 } : item
    );
    setCachedData(CACHE_KEYS.INCIDENTS, updated);
    return updated;
  },
};
