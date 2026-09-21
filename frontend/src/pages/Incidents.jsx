import React from 'react';
import {
  FileWarning,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Users,
  WifiOff,
} from 'lucide-react';
import { useIncidents } from '@/context/IncidentContext';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import IncidentReportForm from '@/components/incidents/IncidentReportForm';
import IncidentFeedCard from '@/components/incidents/IncidentFeedCard';

export const Incidents = () => {
  const { incidents } = useIncidents();
  const { isOnline, offlineQueuedCount } = useOnlineStatus();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
              Crowdsourced Flood Intelligence
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-orange-500/20 text-orange-300 font-mono border border-orange-500/30">
              CITIZEN TELEMETRY
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Incident Reporting & Ground Reality Feed
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Empowering citizens and first-responders to transmit real-time waterlogging reports with offline-first reliability.
          </p>
        </div>

        {/* Offline Queued Badge if any */}
        {offlineQueuedCount > 0 && (
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-amber-400" />
            <span>{offlineQueuedCount} reports queued in offline storage</span>
          </div>
        )}
      </div>

      {/* Grid: Left Submission Form, Right Community Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form */}
        <div className="lg:col-span-5 space-y-4">
          <IncidentReportForm />
        </div>

        {/* Right Column: Live Community Reports Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                Ground Reality Feed ({incidents.length} Reports)
              </h3>
            </div>
            <span className="text-xs text-slate-500">Auto-refreshing live updates</span>
          </div>

          <div className="space-y-3">
            {incidents.map((incident) => (
              <IncidentFeedCard key={incident.id} incident={incident} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incidents;
