import React, { useState } from 'react';
import {
  AlertTriangle,
  Radio,
  Volume2,
  VolumeX,
  Flame,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useAlerts } from '@/hooks/useAlerts';
import { useSimulation } from '@/context/SimulationContext';
import AlertCard from '@/components/alerts/AlertCard';
import AlertFilterBar from '@/components/alerts/AlertFilterBar';
import Button from '@/components/common/Button';

export const Alerts = () => {
  const { alerts, totalCount, criticalCount, highCount, mediumCount } = useAlerts();
  const { audioSirenEnabled, setAudioSirenEnabled, scenarioId } = useSimulation();

  const [activeSeverity, setActiveSeverity] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = alerts.filter((alert) => {
    // Severity filter
    if (activeSeverity !== 'ALL') {
      if (activeSeverity === 'MEDIUM' && (alert.severity === 'MEDIUM' || alert.severity === 'MODERATE')) {
        // match
      } else if (alert.severity !== activeSeverity) {
        return false;
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = alert.title.toLowerCase().includes(q);
      const matchLoc = alert.location.toLowerCase().includes(q);
      const matchDesc = alert.description.toLowerCase().includes(q);
      const matchRoads = alert.affectedRoads?.some((r) => r.toLowerCase().includes(q));
      return matchTitle || matchLoc || matchDesc || matchRoads;
    }

    return true;
  });

  const lowCount = alerts.filter((a) => a.severity === 'LOW').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
              Emergency Broadcast Center
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-500/20 text-red-300 font-mono border border-red-500/30">
              NDRF & PMC DISASTER LINK
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Municipal Flood Early Warnings & Advisories
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Verified emergency notifications distributed across wireless sirens, push channels, and transit authorities.
          </p>
        </div>

        {/* Siren Sound Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            onClick={() => setAudioSirenEnabled(!audioSirenEnabled)}
            variant={audioSirenEnabled ? 'danger' : 'secondary'}
            size="sm"
            icon={audioSirenEnabled ? Volume2 : VolumeX}
          >
            {audioSirenEnabled ? 'Audio Siren Active' : 'Test Audio Siren'}
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <AlertFilterBar
        activeSeverity={activeSeverity}
        onSelectSeverity={setActiveSeverity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        counts={{
          all: totalCount,
          critical: criticalCount,
          high: highCount,
          medium: mediumCount,
          low: lowCount,
        }}
      />

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
            <ShieldCheck className="w-12 h-12 mx-auto text-emerald-400 opacity-80" />
            <h3 className="text-base font-bold text-white">No Matching Warnings</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No active broadcasts match your current filter. Check all warnings or adjust search parameters.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))
        )}
      </div>
    </div>
  );
};

export default Alerts;
