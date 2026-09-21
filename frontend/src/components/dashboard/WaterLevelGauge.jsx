import React from 'react';
import { Waves, AlertTriangle, ArrowUpRight } from 'lucide-react';
import Card from '../common/Card';

export const WaterLevelGauge = ({ currentLevel = 1.2, dangerMark = 2.8, warningMark = 2.2 }) => {
  const maxScale = 3.6;
  const currentPercent = Math.min(100, Math.round((currentLevel / maxScale) * 100));
  const warningPercent = Math.round((warningMark / maxScale) * 100);
  const dangerPercent = Math.round((dangerMark / maxScale) * 100);

  const isDanger = currentLevel >= dangerMark;
  const isWarning = currentLevel >= warningMark && !isDanger;

  return (
    <Card
      title="Mula-Mutha River Stage"
      subtitle="Hydraulic Telemetry • Bund Garden Gauge"
      icon={Waves}
      action={
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
            isDanger
              ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse'
              : isWarning
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
          }`}
        >
          {isDanger ? 'DANGER BREACHED' : isWarning ? 'WARNING STAGE' : 'SAFE FLOW'}
        </span>
      }
    >
      <div className="space-y-4">
        {/* Big Reading */}
        <div className="flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                {Number(currentLevel).toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-slate-400">meters</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Danger Mark: <span className="font-semibold text-red-400 font-mono">{dangerMark} m</span> • Warning Mark: <span className="font-semibold text-amber-400 font-mono">{warningMark} m</span>
            </p>
          </div>

          <div className="text-right text-xs">
            <span className="text-slate-400">Discharge Velocity</span>
            <p className="text-sm font-bold text-slate-200 font-mono">
              {isDanger ? '3.8 m/s (SURGE)' : isWarning ? '2.4 m/s (ELEVATED)' : '1.1 m/s'}
            </p>
          </div>
        </div>

        {/* Horizontal Visual Gauge Bar with Markers */}
        <div className="space-y-1.5 pt-2">
          <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            {/* Dynamic Water Level Fill */}
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                isDanger
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 shadow-glow-critical'
                  : isWarning
                  ? 'bg-gradient-to-r from-emerald-500 to-amber-500'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-500'
              }`}
              style={{ width: `${currentPercent}%` }}
            ></div>

            {/* Warning Marker Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-10"
              style={{ left: `${warningPercent}%` }}
              title={`Warning Level: ${warningMark}m`}
            ></div>

            {/* Danger Marker Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
              style={{ left: `${dangerPercent}%` }}
              title={`Danger Level: ${dangerMark}m`}
            ></div>
          </div>

          {/* Scale Labels */}
          <div className="relative flex justify-between text-[10px] text-slate-500 font-mono pt-1">
            <span>0.0m</span>
            <span style={{ position: 'absolute', left: `${warningPercent}%`, transform: 'translateX(-50%)' }} className="text-amber-400 font-semibold">
              Warning ({warningMark}m)
            </span>
            <span style={{ position: 'absolute', left: `${dangerPercent}%`, transform: 'translateX(-50%)' }} className="text-red-400 font-semibold">
              Danger ({dangerMark}m)
            </span>
            <span>3.6m</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WaterLevelGauge;
