import React from 'react';
import { RISK_CONFIG } from '../../utils/constants';

export const MapLegend = () => {
  const levels = ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'];

  return (
    <div className="bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 shadow-xl text-xs space-y-2 select-none">
      <div className="font-bold text-slate-300 tracking-wide text-[11px] uppercase">
        Inundation Risk Legend
      </div>
      <div className="space-y-1.5">
        {levels.map((lvl) => {
          const cfg = RISK_CONFIG[lvl];
          return (
            <div key={lvl} className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-md shrink-0 border"
                style={{
                  backgroundColor: `${cfg.color}33`,
                  borderColor: cfg.color,
                }}
              ></span>
              <span className="text-slate-300 font-medium">{cfg.badgeText}</span>
              <span className="text-[10px] text-slate-500 font-mono ml-auto">
                {lvl === 'LOW' && '< 10cm'}
                {lvl === 'MODERATE' && '10–25cm'}
                {lvl === 'HIGH' && '25–50cm'}
                {lvl === 'CRITICAL' && '> 50cm'}
              </span>
            </div>
          );
        })}
      </div>
      <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
          <span>Emergency Shelter</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          <span>River Telemetry Gauge</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
          <span>Citizen Reported Incident</span>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
