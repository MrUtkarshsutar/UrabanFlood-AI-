/**
 * Format date and time for disaster alerts and telemetry readings
 */
export const formatDateTime = (dateOrStr) => {
  if (!dateOrStr) return 'N/A';
  const d = new Date(dateOrStr);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

export const formatDateFull = (dateOrStr) => {
  if (!dateOrStr) return 'N/A';
  const d = new Date(dateOrStr);
  return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' +
         d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Format water level in meters with 2 decimal points
 */
export const formatWaterLevel = (meters) => {
  if (meters === undefined || meters === null) return '0.00 m';
  return `${Number(meters).toFixed(2)} m`;
};

/**
 * Format precipitation in mm/hr
 */
export const formatRainfall = (mmHr) => {
  if (mmHr === undefined || mmHr === null) return '0 mm/hr';
  return `${Math.round(mmHr)} mm/hr`;
};

/**
 * Format distance in km or meters
 */
export const formatDistance = (meters) => {
  if (!meters && meters !== 0) return 'Unknown';
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
};

/**
 * Format duration in minutes
 */
export const formatDuration = (seconds) => {
  if (!seconds) return '0 min';
  const mins = Math.round(seconds / 60);
  return `${mins} min`;
};

/**
 * Relative time helper (e.g. "2 min ago")
 */
export const formatRelativeTime = (timestamp) => {
  if (!timestamp) return 'Just now';
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return `${Math.max(1, diffSec)}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  return `${diffHr}h ago`;
};
