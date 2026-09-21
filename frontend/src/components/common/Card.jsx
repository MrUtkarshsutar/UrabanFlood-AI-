import React from 'react';

export const Card = ({
  children,
  title,
  subtitle,
  icon: Icon,
  action,
  className = '',
  bodyClassName = '',
  hazardGlow,
  hazardBorder,
}) => {
  return (
    <div
      className={`bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800/90 shadow-xl transition-all duration-200 overflow-hidden ${hazardGlow ? `shadow-glow-${hazardGlow}` : ''} ${hazardBorder || ''} ${className}`}
    >
      {(title || Icon || action) && (
        <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {Icon && (
              <div className="w-8 h-8 rounded-lg bg-slate-800/90 border border-slate-700/60 flex items-center justify-center shrink-0 text-cyan-400">
                <Icon className="w-4 h-4" />
              </div>
            )}
            <div className="min-w-0">
              {title && (
                <h3 className="text-sm font-semibold text-slate-100 tracking-tight truncate">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-slate-400 truncate">{subtitle}</p>
              )}
            </div>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={`p-5 ${bodyClassName}`}>{children}</div>
    </div>
  );
};

export default Card;
