import React from 'react';
import { WifiOff, AlertCircle, RefreshCw } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { formatRelativeTime } from '../../utils/formatters';

export const OfflineBanner = () => {
  const { isOnline, isSimulatedOffline, lastSyncTime, toggleSimulatedOffline } = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 text-amber-200 text-xs sm:text-sm flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50 backdrop-blur-md">
      <div className="flex items-center gap-2.5">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
        </span>
        <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="font-semibold tracking-wide uppercase text-amber-300">
          OFFLINE MODE {isSimulatedOffline && '(Simulated Presentation Mode)'}
        </span>
        <span className="hidden md:inline text-slate-300">|</span>
        <span className="text-slate-300">
          Operating on cached telemetry • Last synced: {formatRelativeTime(lastSyncTime)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden lg:inline text-xs text-amber-300/80">
          Emergency shelters & safe routing operational offline
        </span>
        {isSimulatedOffline && (
          <button
            onClick={toggleSimulatedOffline}
            className="px-2.5 py-1 rounded bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 border border-amber-500/40 text-xs font-medium transition-colors"
          >
            Re-enable Online
          </button>
        )}
      </div>
    </div>
  );
};

export default OfflineBanner;
