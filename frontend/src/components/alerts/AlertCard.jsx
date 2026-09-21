import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  AlertOctagon,
  ShieldCheck,
  Flame,
  Clock,
  MapPin,
  Navigation,
  Ban,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import Badge from '../common/Badge';
import { formatDateFull, formatRelativeTime } from '../../utils/formatters';

export const AlertCard = ({ alert }) => {
  const isCritical = alert.severity === 'CRITICAL';
  const isHigh = alert.severity === 'HIGH';
  const isMedium = alert.severity === 'MEDIUM' || alert.severity === 'MODERATE';

  const severityIcons = {
    CRITICAL: Flame,
    HIGH: AlertOctagon,
    MEDIUM: AlertTriangle,
    MODERATE: AlertTriangle,
    LOW: ShieldCheck,
  };

  const IconComponent = severityIcons[alert.severity] || AlertTriangle;

  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-200 backdrop-blur-md overflow-hidden ${
        isCritical
          ? 'bg-red-950/30 border-red-500/40 shadow-glow-critical'
          : isHigh
          ? 'bg-orange-950/20 border-orange-500/40 shadow-glow-high'
          : isMedium
          ? 'bg-amber-950/20 border-amber-500/30 shadow-glow-moderate'
          : 'bg-slate-900/80 border-slate-800'
      }`}
    >
      {/* Card Header: Severity Badge, Location, Timestamp */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Badge variant={alert.severity} size="md" icon={IconComponent}>
            {alert.severity} ALERT
          </Badge>
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            {alert.location} ({alert.ward})
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatRelativeTime(alert.issuedAt)}</span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="pt-3.5 space-y-2">
        <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug">
          {alert.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {alert.description}
        </p>
      </div>

      {/* Affected Roads / Obstacles */}
      {alert.affectedRoads && alert.affectedRoads.length > 0 && (
        <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider">
            <Ban className="w-3.5 h-3.5" />
            <span>Avoid Submerged Roads / Underpasses:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {alert.affectedRoads.map((road, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-red-500/10 text-red-300 border border-red-500/20"
              >
                {road}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Advisory & Shelter Guidance */}
      <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-2">
        <div className="text-xs text-slate-300">
          <span className="font-bold text-cyan-400 uppercase tracking-wide mr-1.5">
            Recommended Action:
          </span>
          {alert.recommendedAction}
        </div>

        {alert.shelterName && (
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              Nearest Safe Shelter: <strong className="text-white">{alert.shelterName}</strong>
            </span>
            <Link
              to="/safe-route"
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 shrink-0"
            >
              <Navigation className="w-3.5 h-3.5" /> Safe Route
            </Link>
          </div>
        )}
      </div>

      {/* Authority Issuer Tag */}
      <div className="mt-3 pt-2 text-[10px] text-slate-500 flex items-center justify-between">
        <span>Issued by: {alert.issuer}</span>
        <span className="font-mono text-emerald-400 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Digital Siren Confirmed
        </span>
      </div>
    </div>
  );
};

export default AlertCard;
