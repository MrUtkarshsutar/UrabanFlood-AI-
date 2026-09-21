import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon: Icon,
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3 py-1.5 font-semibold',
  };

  const variantClasses = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    LOW: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    MODERATE: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    HIGH: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    CRITICAL: 'bg-red-500/15 text-red-400 border-red-500/40 animate-pulse',
    AVAILABLE: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    LIMITED: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    FULL: 'bg-red-500/15 text-red-400 border-red-500/30',
    CLOSED: 'bg-slate-800 text-slate-400 border-slate-700',
    info: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  };

  const chosenVariant = variantClasses[variant] || variantClasses.default;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border backdrop-blur-sm transition-colors ${chosenVariant} ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      {children}
    </span>
  );
};

export default Badge;
