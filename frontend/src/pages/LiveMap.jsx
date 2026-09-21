import React, { useState } from 'react';
import {
  Map as MapIcon,
  Layers,
  Filter,
  Shield,
  Building2,
  Radio,
  FileWarning,
  X,
  Info,
  Navigation,
} from 'lucide-react';
import { useFloodData } from '@/hooks/useFloodData';
import { useShelters } from '@/hooks/useShelters';
import { useIncidents } from '@/context/IncidentContext';
import FloodMap from '@/components/map/FloodMap';
import Badge from '@/components/common/Badge';
import { SENSORS_DATA } from '@/data/sensors';
import { RISK_CONFIG } from '@/utils/constants';

export const LiveMap = () => {
  const { zones, scenarioId, activeScenario } = useFloodData();
  const { shelters } = useShelters();
  const { incidents } = useIncidents();

  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('ALL');

  const filteredZones = zones.filter((zone) => {
    if (selectedRiskFilter === 'ALL') return true;
    return zone.riskLevel === selectedRiskFilter;
  });

  return (
    <div className="space-y-4">
      {/* Map Header & Filter Toolbar */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
            <MapIcon className="w-5 h-5 text-cyan-400" />
            Live Flood Geospatial Map
          </h2>
          <p className="text-xs text-slate-400">
            Real-time urban catchment monitoring • Pune Metropolitan District
          </p>
        </div>

        {/* Risk Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400 mr-1 flex items-center gap-1 font-semibold">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedRiskFilter(lvl)}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all ${
                selectedRiskFilter === lvl
                  ? 'bg-cyan-600/20 text-cyan-300 border-cyan-500 shadow-glow-blue'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Container with Side Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className={selectedZone ? 'lg:col-span-3' : 'lg:col-span-4'}>
          <FloodMap
            height="640px"
            zones={filteredZones}
            shelters={shelters}
            sensors={SENSORS_DATA}
            incidents={incidents}
            onSelectZone={(zone) => setSelectedZone(zone)}
            showControls={true}
            showLegend={true}
          />
        </div>

        {/* Selected Zone Inspector Drawer */}
        {selectedZone && (
          <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">
                    {selectedZone.id}
                  </span>
                  <h3 className="text-base font-extrabold text-white tracking-tight">
                    {selectedZone.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedZone(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={selectedZone.riskLevel} size="md">
                  {selectedZone.riskLevel} RISK
                </Badge>
                <span className="text-xs font-mono text-slate-400">
                  Score: {selectedZone.riskScore}
                </span>
              </div>

              {/* Statistics */}
              <div className="space-y-2 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex justify-between">
                  <span className="text-slate-400">Est. Inundation Depth:</span>
                  <span className="font-bold text-white font-mono">{selectedZone.depthEstCm} cm</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex justify-between">
                  <span className="text-slate-400">Ground Elevation:</span>
                  <span className="font-bold text-white font-mono">{selectedZone.elevationM} meters</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex justify-between">
                  <span className="text-slate-400">Drainage Congestion:</span>
                  <span className="font-bold text-white font-mono">
                    {Math.round(selectedZone.drainageCongestion * 100)}% Choked
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex justify-between">
                  <span className="text-slate-400">Population at Hazard:</span>
                  <span className="font-bold text-white font-mono">
                    {selectedZone.population.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Critical Infrastructure */}
              {selectedZone.criticalInfrastructure && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Vulnerable Junctions:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedZone.criticalInfrastructure.map((infra, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {infra}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedZone(null)}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Close Inspector
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveMap;
