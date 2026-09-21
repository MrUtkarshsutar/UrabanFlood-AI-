import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({ message = 'Loading flood conditions...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center min-h-[220px]">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-cyan-400/80 animate-ping"></div>
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-300">{message}</p>
      <p className="mt-1 text-xs text-slate-500">Connecting to telemetry network...</p>
    </div>
  );
};

export default LoadingState;
