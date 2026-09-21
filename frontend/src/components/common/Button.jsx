import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2 rounded-lg gap-2',
    lg: 'text-base px-5 py-2.5 rounded-xl gap-2.5 font-semibold',
  };

  const variantClasses = {
    primary:
      'bg-cyan-600 hover:bg-cyan-500 text-white shadow-glow-blue border border-cyan-400/30 active:scale-[0.98]',
    secondary:
      'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-[0.98]',
    danger:
      'bg-red-600 hover:bg-red-500 text-white shadow-glow-critical border border-red-400/40 active:scale-[0.98]',
    warning:
      'bg-amber-600 hover:bg-amber-500 text-white shadow-glow-moderate border border-amber-400/40 active:scale-[0.98]',
    outline:
      'bg-transparent hover:bg-slate-800/60 text-slate-300 border border-slate-750 hover:border-slate-600 active:scale-[0.98]',
    ghost:
      'bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-transparent',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
};

export default Button;
