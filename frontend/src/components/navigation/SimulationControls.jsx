import React from 'react';
import { Play, FastForward, CloudRain, AlertTriangle, ShieldCheck, Flame, Volume2, VolumeX } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { SIMULATION_SCENARIOS, RISK_CONFIG } from '../../utils/constants';

export const SimulationControls = () => {
  const {
    scenarioId,
    setScenario,
    nextScenario,
    audioSirenEnabled,
    setAudioSirenEnabled,
  } = useSimulation();

  const scenariosList = [
    {
      id: 'NORMAL',
      label: 'Normal Monsoon',
      sub: '18 mm/hr • 1.2m',
      risk: 'LOW',
      icon: ShieldCheck,
      color: 'hover:border-emerald-500/50 hover:bg-emerald-500/10',
      activeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500 shadow-glow-low',
    },
    {
      id: 'HEAVY_RAIN',
      label: 'Heavy Rain',
      sub: '48 mm/hr • 1.9m',
      risk: 'MODERATE',
      icon: CloudRain,
      color: 'hover:border-amber-500/50 hover:bg-amber-500/10',
      activeColor: 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-glow-moderate',
    },
    {
      id: 'FLOOD_RISK',
      label: 'Flood Escalation',
      sub: '72 mm/hr • 2.45m',
      risk: 'HIGH',
      icon: AlertTriangle,
      color: 'hover:border-orange-500/50 hover:bg-orange-500/10',
      activeColor: 'bg-orange-500/20 text-orange-300 border-orange-500 shadow-glow-high',
    },
    {
      id: 'CRITICAL',
      label: 'Critical Warning',
      sub: '105 mm/hr • 3.15m',
      risk: 'CRITICAL',
      icon: Flame,
      color: 'hover:border-red-500/50 hover:bg-red-500/10',
      activeColor: 'bg-red-500/25 text-red-300 border-red-500 shadow-glow-critical animate-pulse',
    },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Title and presentation info */}
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                SIH Live Simulation Engine
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Demo Controller
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Simulate disaster escalation stages to demonstrate dynamic platform response
            </p>
          </div>
        </div>

        {/* Scenario Selectors */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {scenariosList.map((sc) => {
            const Icon = sc.icon;
            const isActive = scenarioId === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => setScenario(sc.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200 select-none ${
                  isActive
                    ? sc.activeColor
                    : `bg-slate-800/80 text-slate-300 border-slate-700/80 ${sc.color}`
                }`}
                title={`Switch to ${sc.label}`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <div className="text-left">
                  <div className="font-semibold leading-tight">{sc.label}</div>
                  <div className="text-[10px] opacity-75 hidden md:block">{sc.sub}</div>
                </div>
              </button>
            );
          })}

          {/* Step Next Button */}
          <button
            onClick={nextScenario}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-colors"
            title="Advance to next simulation scenario"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Next Stage</span>
          </button>

          {/* Siren / Audio Toggle */}
          <button
            onClick={() => setAudioSirenEnabled(!audioSirenEnabled)}
            className={`p-2 rounded-xl border text-xs transition-colors ${
              audioSirenEnabled
                ? 'bg-red-500/20 text-red-300 border-red-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title={audioSirenEnabled ? 'Mute Emergency Audio Siren' : 'Enable Emergency Audio Siren'}
          >
            {audioSirenEnabled ? <Volume2 className="w-4 h-4 text-red-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimulationControls;
