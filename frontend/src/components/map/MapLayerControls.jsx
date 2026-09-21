import React from 'react';
import { Layers, Shield, Radio, Home, FileWarning } from 'lucide-react';

export const MapLayerControls = ({ layers, onToggleLayer }) => {
  const layerItems = [
    { key: 'zones', label: 'Flood Risk Zones', icon: Shield, active: layers.zones },
    { key: 'sensors', label: 'River Gauges & AWS', icon: Radio, active: layers.sensors },
    { key: 'shelters', label: 'Relief Shelters', icon: Home, active: layers.shelters },
    { key: 'incidents', label: 'Citizen Reports', icon: FileWarning, active: layers.incidents },
  ];

  return (
    <div className="bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 shadow-xl text-xs space-y-2 select-none">
      <div className="flex items-center gap-1.5 font-bold text-slate-300 tracking-wide text-[11px] uppercase">
        <Layers className="w-3.5 h-3.5 text-cyan-400" />
        Map Layers
      </div>
      <div className="space-y-1">
        {layerItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => onToggleLayer(item.key)}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-left transition-colors ${
                item.active
                  ? 'bg-slate-800 border-slate-700 text-slate-200'
                  : 'bg-transparent border-transparent text-slate-500 hover:text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-3.5 h-3.5 ${item.active ? 'text-cyan-400' : 'text-slate-600'}`} />
                <span>{item.label}</span>
              </div>
              <span
                className={`w-2 h-2 rounded-full ${item.active ? 'bg-cyan-400' : 'bg-slate-700'}`}
              ></span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MapLayerControls;
