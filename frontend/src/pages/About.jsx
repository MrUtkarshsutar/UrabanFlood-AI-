import React from 'react';
import {
  Info,
  Layers,
  Cpu,
  Database,
  Radio,
  WifiOff,
  PhoneCall,
  Shield,
  Award,
  ExternalLink,
} from 'lucide-react';
import Card from '@/components/common/Card';

export const About = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Smart India Hackathon (SIH)
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
              URBANFLOOD AI PLATFORM
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            System Architecture & Disaster Response Framework
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            An end-to-end AI and geospatial decision support platform for urban flash flood nowcasting, dynamic hazard routing, and citizen early warning.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs text-slate-300 shrink-0">
          <Award className="w-5 h-5 text-amber-400" />
          <div>
            <span className="font-bold text-white block">SIH Grand Finale Project</span>
            <span className="text-[10px] text-slate-400">Disaster Management Division</span>
          </div>
        </div>
      </div>

      {/* 4 Architecture Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">1. Geospatial Topography</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Copernicus 30m Digital Elevation Model (DEM) integrated with OpenStreetMap stormwater drainage network for slope, flow direction, and elevation indices.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Radio className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">2. Multi-Sensor Telemetry</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Doppler weather radar and Open-Meteo precipitation feeds synchronized with IoT ultrasonic river stage gauges along the Mula-Mutha river basin.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">3. Hydrodynamic AI Model</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            XGBoost classifier paired with 1D/2D hydraulic overland cellular automata to forecast localized inundation depths with 0–60 min nowcasting horizons.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <WifiOff className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">4. Offline Resilience</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Progressive Web App (PWA) client with local cache persistence. Safe routes, shelter registries, and citizen incident reporting operate smoothly without cellular connection.
          </p>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Data Flow & Integration Pipeline" icon={Database}>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-white block mb-1">Frontend Layer (React + Vite + Tailwind)</span>
              <p className="text-slate-400 leading-relaxed">
                Decoupled service abstractions (<code className="text-cyan-400 font-mono">floodService.js</code>, <code className="text-cyan-400 font-mono">routingService.js</code>) allowing zero-rework transition from simulated mock modes to production FastAPI endpoints.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-white block mb-1">Backend REST Services (FastAPI + PostGIS)</span>
              <p className="text-slate-400 leading-relaxed">
                High-throughput asynchronous endpoints (<code className="text-cyan-400 font-mono">/api/v1/flood-map</code>, <code className="text-cyan-400 font-mono">/api/v1/safe-route</code>) calculating dynamic edge weights with A* navigation.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-white block mb-1">Geospatial Routing Engine</span>
              <p className="text-slate-400 leading-relaxed">
                Penalizes submerged road segments based on water depth thresholds (&gt;30cm impassable for light vehicles, &gt;60cm impassable for emergency transport).
              </p>
            </div>
          </div>
        </Card>

        <Card title="Emergency Operation Hotlines (Pune Central)" icon={PhoneCall}>
          <div className="space-y-2.5 text-xs">
            {[
              { name: 'Disaster Management Cell PMC', num: '1077 / 020-25501269', status: '24/7 Toll-Free' },
              { name: 'National Disaster Response Force (NDRF)', num: '020-27174545', status: 'Immediate Rescue' },
              { name: 'Fire & Flood Emergency Services', num: '101', status: 'Active Emergency' },
              { name: 'Traffic Command & Diversion Desk', num: '020-26208225', status: 'Traffic Advisory' },
              { name: 'Ambulance Emergency Dispatch', num: '108', status: 'Medical Triage' },
            ].map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800"
              >
                <div>
                  <span className="font-bold text-white block">{c.name}</span>
                  <span className="font-mono text-cyan-400 font-bold">{c.num}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
