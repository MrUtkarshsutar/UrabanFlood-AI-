import React, { useState } from 'react';
import {
  TrendingUp,
  Clock,
  Cpu,
  Droplets,
  AlertTriangle,
  Waves,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { useSimulation } from '@/context/SimulationContext';
import { getForecastDataForScenario } from '@/data/forecasts';
import NowcastChart from '@/components/charts/NowcastChart';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';

export const Nowcasting = () => {
  const { scenarioId, activeScenario, zones } = useSimulation();
  const forecastData = getForecastDataForScenario(scenarioId);

  const [activeStepIndex, setActiveStepIndex] = useState(2); // default +30 min
  const activeStep = forecastData.timeline[activeStepIndex] || forecastData.timeline[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Hydrodynamic AI Inference
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
              0–60 MIN NOWCAST
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            High-Resolution Urban Flood Nowcasting
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Coupled 1D hydraulic channel routing with XGBoost overland runoff predictions.
          </p>
        </div>

        {/* Confidence Indicator Card */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-white font-mono">
                {forecastData.confidencePercent}%
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">Confidence</span>
            </div>
            <p className="text-[10px] text-emerald-400 font-mono">
              RMSE: 0.04m • Latency: 18ms
            </p>
          </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <Card
        title="Predictive Hyetograph & River Inundation Curve (Next 60 Minutes)"
        subtitle="Dual-axis projection: Precipitation rate (mm/hr) vs Bund Garden River Stage (m)"
        icon={TrendingUp}
        action={
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" /> Projected at 15-min cadences
          </span>
        }
      >
        <NowcastChart
          timeline={forecastData.timeline}
          dangerMark={forecastData.dangerMarkM}
          height={320}
        />
      </Card>

      {/* Interactive Time Horizon Scrubber */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">
              Timeline Horizon Inspection
            </h3>
            <p className="text-xs text-slate-400">
              Select a future timestep to inspect simulated flood surge across the city
            </p>
          </div>
          <div className="text-xs text-slate-400">
            Inspecting:{' '}
            <strong className="text-cyan-400 font-mono text-sm">{activeStep.time}</strong>
          </div>
        </div>

        {/* 5 Timestep Step Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {forecastData.timeline.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <button
                key={step.time}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 rounded-xl border text-left transition-all select-none ${
                  isSelected
                    ? 'bg-cyan-600/20 text-cyan-300 border-cyan-500 shadow-glow-blue'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold text-white">{step.time}</div>
                <div className="mt-1 flex items-baseline justify-between text-[11px]">
                  <span className="text-cyan-400 font-mono">{step.rainfallMmHr} mm/h</span>
                  <span className="text-blue-400 font-mono">{step.waterLevelM} m</span>
                </div>
                <div className="mt-1.5">
                  <Badge variant={step.riskLevel} size="sm">
                    {step.riskLevel}
                  </Badge>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Horizon Metrics Callout */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 uppercase text-[10px] font-semibold">Predicted Rain</span>
            <p className="text-lg font-black text-cyan-400 font-mono mt-0.5">
              {activeStep.rainfallMmHr} mm/hr
            </p>
          </div>
          <div>
            <span className="text-slate-500 uppercase text-[10px] font-semibold">Projected River Level</span>
            <p className="text-lg font-black text-blue-400 font-mono mt-0.5">
              {activeStep.waterLevelM} m
            </p>
          </div>
          <div>
            <span className="text-slate-500 uppercase text-[10px] font-semibold">Est. Inundated Area</span>
            <p className="text-lg font-black text-orange-400 font-mono mt-0.5">
              {activeStep.affectedAreaSqKm} sq km
            </p>
          </div>
          <div>
            <span className="text-slate-500 uppercase text-[10px] font-semibold">AI Confidence</span>
            <p className="text-lg font-black text-emerald-400 font-mono mt-0.5">
              {activeStep.confidencePercent}%
            </p>
          </div>
        </div>
      </div>

      {/* Ward-by-Ward Projection Table */}
      <Card
        title="Ward-Level Flood Projection Matrix (Next 60 Minutes)"
        subtitle="Hydraulic vulnerability calculated per administrative ward"
        icon={Droplets}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-semibold">
                <th className="pb-3 pr-4">Ward / Catchment Area</th>
                <th className="pb-3 px-4 font-mono">Elevation</th>
                <th className="pb-3 px-4 font-mono">Drain Choke</th>
                <th className="pb-3 px-4 font-mono">+30m Projected Depth</th>
                <th className="pb-3 px-4 font-mono">+60m Projected Depth</th>
                <th className="pb-3 px-4">Nowcast Hazard Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
              {zones.map((z) => {
                const est30m = Math.round(z.depthEstCm * (scenarioId === 'CRITICAL' ? 1.4 : 1.15));
                const est60m = Math.round(z.depthEstCm * (scenarioId === 'CRITICAL' ? 1.8 : 1.3));

                return (
                  <tr key={z.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="font-bold text-white">{z.name}</div>
                      <div className="text-[10px] text-slate-500">Ward #{z.wardNumber} • Pop: {z.population.toLocaleString()}</div>
                    </td>
                    <td className="py-3 px-4 font-mono">{z.elevationM} m</td>
                    <td className="py-3 px-4 font-mono text-amber-400">
                      {Math.round(z.drainageCongestion * 100)}%
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <span className={est30m > 30 ? 'text-red-400 font-bold' : 'text-slate-200'}>
                        {est30m} cm
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <span className={est60m > 50 ? 'text-red-400 font-bold' : 'text-slate-200'}>
                        {est60m} cm
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={z.riskLevel} size="sm">
                        {z.riskLevel}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Nowcasting;
