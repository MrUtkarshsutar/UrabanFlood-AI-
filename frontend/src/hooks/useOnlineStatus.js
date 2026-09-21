import { useState, useEffect } from 'react';
import { getLastSyncTime, getOfflineQueue, clearOfflineQueue } from '../utils/storage';

export const useOnlineStatus = () => {
  const [isBrowserOnline, setIsBrowserOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(false);
  const [lastSync, setLastSync] = useState(getLastSyncTime());
  const [offlineCount, setOfflineCount] = useState(getOfflineQueue().length);

  useEffect(() => {
    const handleOnline = () => setIsBrowserOnline(true);
    const handleOffline = () => setIsBrowserOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const effectiveOnline = isBrowserOnline && !isSimulatedOffline;

  // Sync offline queue when coming back online
  useEffect(() => {
    if (effectiveOnline) {
      const queue = getOfflineQueue();
      if (queue.length > 0) {
        console.log(`Syncing ${queue.length} offline queued incidents...`);
        clearOfflineQueue();
        setOfflineCount(0);
        setLastSync(new Date().toISOString());
      }
    }
  }, [effectiveOnline]);

  const toggleSimulatedOffline = () => {
    setIsSimulatedOffline((prev) => !prev);
  };

  return {
    isOnline: effectiveOnline,
    isSimulatedOffline,
    toggleSimulatedOffline,
    lastSyncTime: lastSync,
    offlineQueuedCount: offlineCount,
  };
};
