import React from 'react';
import { ThumbsUp, MapPin, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import Badge from '../common/Badge';
import { formatRelativeTime } from '../../utils/formatters';
import { useIncidents } from '../../context/IncidentContext';

export const IncidentFeedCard = ({ incident }) => {
  const { upvoteReport } = useIncidents();

  return (
    <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 hover:border-slate-700/80 transition-all flex flex-col sm:flex-row gap-4">
      {/* Photo Preview if available */}
      {incident.imageUrl && (
        <div className="w-full sm:w-36 h-28 shrink-0 rounded-xl overflow-hidden border border-slate-800 relative bg-slate-950">
          <img
            src={incident.imageUrl}
            alt={incident.categoryLabel}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-cyan-300 font-bold">
            ~{incident.depthCm} cm
          </div>
        </div>
      )}

      {/* Incident Details */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant={incident.severity} size="sm">
              {incident.severity}
            </Badge>
            <span className="text-xs font-bold text-white tracking-tight">
              {incident.categoryLabel}
            </span>
          </div>

          <span className="text-[11px] text-slate-400 font-mono">
            {formatRelativeTime(incident.timestamp)}
          </span>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="font-semibold text-slate-300">{incident.locationName}</span>
          <span>({incident.ward})</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {incident.description}
        </p>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500">
            Reported by: <strong className="text-slate-400">{incident.reportedBy}</strong>
          </span>

          <button
            onClick={() => upvoteReport(incident.id)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 text-xs font-semibold border border-slate-700 transition-colors"
            title="Confirm this incident"
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Confirm ({incident.upvotes || 0})</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentFeedCard;
