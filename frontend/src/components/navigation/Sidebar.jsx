import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  TrendingUp,
  AlertTriangle,
  Navigation,
  Home,
  FileWarning,
  Info,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { useAlerts } from '../../hooks/useAlerts';
import { useIncidents } from '../../context/IncidentContext';
import { useSimulation } from '../../context/SimulationContext';

export const Sidebar = () => {
  const { criticalCount, totalCount } = useAlerts();
  const { incidents } = useIncidents();
  const { scenarioId } = useSimulation();

  const links = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/map', label: 'Live Flood Map', icon: Map, badge: scenarioId === 'CRITICAL' ? 'ALERT' : null },
    { to: '/nowcasting', label: 'Flood Nowcasting', icon: TrendingUp },
    {
      to: '/alerts',
      label: 'Early Warnings',
      icon: AlertTriangle,
      count: totalCount,
      countCritical: criticalCount > 0,
    },
    { to: '/safe-route', label: 'Safe Evacuation Route', icon: Navigation },
    { to: '/shelters', label: 'Relief Shelters', icon: Home },
    { to: '/incidents', label: 'Citizen Incident Reports', icon: FileWarning, count: incidents.length },
    { to: '/about', label: 'System Architecture', icon: Info },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-slate-950/80 backdrop-blur-xl border-r border-slate-800/80 min-h-[calc(100vh-65px)] p-4 justify-between">
      <div className="space-y-6">
        {/* Navigation Section */}
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Disaster Command Center
          </p>
          <nav className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/10 text-cyan-400 border border-cyan-500/30 shadow-glow-blue'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                    <span>{link.label}</span>
                  </div>

                  {link.count !== undefined && link.count > 0 && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        link.countCritical
                          ? 'bg-red-500/30 text-red-300 border border-red-500/40 animate-pulse'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {link.count}
                    </span>
                  )}

                  {link.badge && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-red-600 text-white animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            Telemetry Network
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
            OPERATIONAL
          </span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Copernicus 30m DEM • Open-Meteo Radar • PostGIS Hydro Engine
        </p>
        <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
          <span>SIH Disaster AI</span>
          <span>v1.0.0-prod</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
