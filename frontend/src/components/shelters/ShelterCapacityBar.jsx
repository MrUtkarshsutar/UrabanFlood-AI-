import React from 'react';

export const ShelterCapacityBar = ({ occupied, capacity }) => {
  const percent = capacity > 0 ? Math.min(100, Math.round((occupied / capacity) * 100)) : 0;
  const isFull = percent >= 95;
  const isLimited = percent >= 75 && !isFull;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-xs">
        <span className="text-slate-400">Shelter Occupancy:</span>
        <span className="font-mono font-bold text-white">
          {occupied} / {capacity} beds ({percent}%)
        </span>
      </div>

      <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/80">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isFull
              ? 'bg-red-500 shadow-glow-critical'
              : isLimited
              ? 'bg-amber-500'
              : 'bg-emerald-500'
          }`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ShelterCapacityBar;
