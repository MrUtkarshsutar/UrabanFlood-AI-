import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, ShieldAlert, Navigation } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatRelativeTime } from '../../utils/formatters';

export const RecentAlertsList = ({ alerts = [] }) => {
  return (
    <Card
      title="Active Emergency Warnings"
      subtitle={`${alerts.length} Early warning broadcasts in effect`}
      icon={AlertTriangle}
      action={
        <Link
          to="/alerts"
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      }
    >
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-950/40 border border-slate-800/80 text-center">
            <ShieldAlert className="w-8 h-8 mx-auto text-emerald-400 mb-2 opacity-80" />
            <p className="text-sm font-semibold text-slate-200">No Critical Hazard Warnings</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Hydrological flow and city culverts operating normally.
            </p>
          </div>
        ) : (
          alerts.slice(0, 3).map((alert) => {
            const isCritical = alert.severity === 'CRITICAL';
            const isHigh = alert.severity === 'HIGH';

            return (
              <div
                key={alert.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCritical
                    ? 'bg-red-500/10 border-red-500/30 hover:border-red-500/50'
                    : isHigh
                    ? 'bg-orange-500/10 border-orange-500/30 hover:border-orange-500/50'
                    : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <Badge variant={alert.severity} size="sm">
                    {alert.severity}
                  </Badge>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {formatRelativeTime(alert.issuedAt)}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
                  {alert.title}
                </h4>

                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  {alert.description}
                </p>

                {alert.affectedRoads && alert.affectedRoads.length > 0 && (
                  <div className="mt-2 text-[11px] text-slate-400 flex flex-wrap gap-1 items-center">
                    <span className="text-red-400 font-semibold">Avoid:</span>
                    {alert.affectedRoads.slice(0, 2).map((road, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {road}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">{alert.location}</span>
                  <Link
                    to="/safe-route"
                    className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3" /> Safe Route
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};

export default RecentAlertsList;
