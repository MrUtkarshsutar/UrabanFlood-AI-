const CACHE_KEYS = {
  FLOOD_SNAPSHOT: 'urbanflood_snapshot',
  INCIDENTS: 'urbanflood_incidents',
  OFFLINE_QUEUE: 'urbanflood_offline_incident_queue',
  LAST_SYNC: 'urbanflood_last_sync_time',
};

export const getCachedData = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.warn(`Error reading localStorage key ${key}:`, err);
    return fallback;
  }
};

export const setCachedData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Error writing to localStorage key ${key}:`, err);
  }
};

export const saveSnapshot = (snapshot) => {
  setCachedData(CACHE_KEYS.FLOOD_SNAPSHOT, snapshot);
  setCachedData(CACHE_KEYS.LAST_SYNC, new Date().toISOString());
};

export const getLatestSnapshot = () => {
  return getCachedData(CACHE_KEYS.FLOOD_SNAPSHOT);
};

export const getLastSyncTime = () => {
  return getCachedData(CACHE_KEYS.LAST_SYNC, new Date().toISOString());
};

export const queueOfflineIncident = (incident) => {
  const queue = getCachedData(CACHE_KEYS.OFFLINE_QUEUE, []);
  queue.push({ ...incident, queuedAt: new Date().toISOString() });
  setCachedData(CACHE_KEYS.OFFLINE_QUEUE, queue);
};

export const getOfflineQueue = () => {
  return getCachedData(CACHE_KEYS.OFFLINE_QUEUE, []);
};

export const clearOfflineQueue = () => {
  setCachedData(CACHE_KEYS.OFFLINE_QUEUE, []);
};

export { CACHE_KEYS };
