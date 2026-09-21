import React from 'react';
import { AlertOctagon, ShieldCheck, AlertTriangle, Flame, Users, Landmark } from 'lucide-react';
import { RISK_CONFIG } from '../../utils/constants';

export const RiskOverview = ({ statusData, scenarioId }) => {
  if (!statusData) return null;

  const {
    dominantRisk,
    riskScore,
    statusHeadline,
    description,
    affectedWardsCount,
    populationAtRisk,
  } = statusData;

  const cfg = RISK_CONFIG[dominantRisk] || RISK_CONFIG.LOW;

  const icons = {
    LOW: ShieldCheck,
    MODERATE: AlertTriangle,
    HIGH: AlertOctagon,
    CRITICAL: Flame,
  };

  const IconComponent = icons[dominantRisk] || ShieldCheck;

  // Percentage for score circle
  const scorePercent = Math.round(riskScore * 100);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-5 sm:p-7 border backdrop-blur-xl transition-all duration-300 ${
        dominantRisk === 'CRITICAL'
          ? 'bg-gradient-to-br from-red-950/80 via-slate-900 to-slate-950 border-red-500/50 shadow-glow-critical'
          : dominantRisk === 'HIGH'
          ? 'bg-gradient-to-br from-orange-950/60 via-slate-900 to-slate-950 border-orange-500/40 shadow-glow-high'
          : dominantRisk === 'MODERATE'
          ? 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border-amber-500/40 shadow-glow-moderate'
          : 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border-emerald-500/30 shadow-glow-low'
      }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Info Column */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${cfg.bgColor} ${cfg.borderColor} ${cfg.textColor}`}
            >
              <IconComponent className="w-4 h-4 shrink-0" />
              {cfg.badgeText}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Urban Basin Hazard Index: {riskScore} / 1.00
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {statusHeadline}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {description}
          </p>

          {/* Key Quick Statistics */}
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-400">
            <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <Landmark className="w-4 h-4 text-cyan-400" />
              <span>Affected Wards:</span>
              <span className="font-bold text-white font-mono">{affectedWardsCount} / 8</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Population at Inundation Risk:</span>
              <span className="font-bold text-white font-mono">
                {populationAtRisk > 0 ? populationAtRisk.toLocaleString() : 'Nominal'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Gauge / Meter Circle */}
        <div className="shrink-0 flex flex-col items-center justify-center self-center sm:self-auto">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* SVG Circular Progress Meter */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="9"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke={cfg.color}
                strokeWidth="9"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - riskScore)}`}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
                fill="transparent"
              />
            </svg>

            {/* Centered Score Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-white font-mono leading-none">
                {scorePercent}%
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-1">
                Risk Score
              </span>
            </div>
          </div>
          <span className={`mt-2 text-xs font-bold uppercase tracking-wider ${cfg.textColor}`}>
            {dominantRisk} LEVEL
          </span>
        </div>
      </div>
    </div>
  );
};

export default RiskOverview;
