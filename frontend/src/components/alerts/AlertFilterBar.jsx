import React from 'react';
import { Search, Filter } from 'lucide-react';

export const AlertFilterBar = ({
  activeSeverity,
  onSelectSeverity,
  searchQuery,
  onSearchChange,
  counts = {},
}) => {
  const tabs = [
    { key: 'ALL', label: 'All Warnings', count: counts.all || 0 },
    { key: 'CRITICAL', label: 'Critical', count: counts.critical || 0, color: 'text-red-400' },
    { key: 'HIGH', label: 'High', count: counts.high || 0, color: 'text-orange-400' },
    { key: 'MEDIUM', label: 'Moderate', count: counts.medium || 0, color: 'text-amber-400' },
    { key: 'LOW', label: 'Low Advisory', count: counts.low || 0, color: 'text-emerald-400' },
  ];

  return (
    <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by road, ward, or affected area..."
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />
      </div>

      {/* Severity Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onSelectSeverity(tab.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all select-none ${
              activeSeverity === tab.key
                ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 shadow-glow-blue'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <span className={tab.color || ''}>{tab.label}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-400 font-mono">
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlertFilterBar;
