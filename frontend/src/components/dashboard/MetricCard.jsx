import React from 'react';

export const MetricCard = ({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  badgeText,
  badgeVariant = 'default',
  trend,
  colorScheme = 'cyan',
}) => {
  const colorAccents = {
    cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    blue: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    amber: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    red: 'text-red-400 border-red-500/30 bg-red-500/10',
    emerald: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  };

  const accent = colorAccents[colorScheme] || colorAccents.cyan;

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 border border-slate-800 hover:border-slate-700/80 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-xl border ${accent}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
          {value}
        </span>
        {unit && <span className="text-sm font-semibold text-slate-400">{unit}</span>}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 text-xs">
        <span className="text-slate-400 truncate">{subtitle}</span>
        {badgeText && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
