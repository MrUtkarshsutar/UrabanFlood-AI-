import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell,
  Wifi,
  WifiOff,
  Flame,
  Radio,
  Clock,
  Menu,
  ShieldAlert,
} from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { useSimulation } from '../../context/SimulationContext';
import { useAlerts } from '../../hooks/useAlerts';
import { formatRelativeTime } from '../../utils/formatters';

export const TopNavbar = ({ onOpenMobileMenu }) => {
  const { isOnline, isSimulatedOffline, toggleSimulatedOffline, lastSyncTime } = useOnlineStatus();
  const { scenarioId, activeScenario } = useSimulation();
  const { criticalCount, totalCount } = useAlerts();
  const location = useLocation();

  const isCritical = scenarioId === 'CRITICAL';

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/90 px-4 lg:px-8 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 p-0.5 shadow-glow-blue flex items-center justify-center shrink-0">
              <img src="/logo.svg" alt="UrbanFlood AI Logo" className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-slate-100 via-white to-cyan-400 bg-clip-text text-transparent">
                  URBANFLOOD AI
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  SIH
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
                Urban Flood Nowcasting & Emergency Response Platform
              </p>
            </div>
          </Link>
        </div>

        {/* Center / Right: Live Status, Offline Toggle, Alerts */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Condition Badge */}
          <div
            className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold backdrop-blur-md ${
              isCritical
                ? 'bg-red-500/20 text-red-300 border-red-500/50 shadow-glow-critical animate-pulse'
                : scenarioId === 'FLOOD_RISK'
                ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                : scenarioId === 'HEAVY_RAIN'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isCritical ? 'bg-red-400' : 'bg-emerald-400'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                isCritical ? 'bg-red-500' : 'bg-emerald-500'
              }`}></span>
            </span>
            <span>{activeScenario.name}</span>
            <span className="text-slate-400 font-mono text-[11px] font-normal">
              ({activeScenario.rainfallMmHr} mm/h • {activeScenario.waterLevelM}m)
            </span>
          </div>

          {/* Offline Mode Toggle Button */}
          <button
            onClick={toggleSimulatedOffline}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
              !isOnline
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-glow-moderate'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
            title="Toggle simulated offline mode for SIH presentation"
          >
            {!isOnline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="hidden sm:inline">Offline Mode</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="hidden sm:inline">Online (Simulate Offline)</span>
              </>
            )}
          </button>

          {/* Alerts Bell */}
          <Link
            to="/alerts"
            className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="View Active Emergency Alerts"
          >
            <Bell className="w-4 h-4" />
            {totalCount > 0 && (
              <span
                className={`absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                  criticalCount > 0 ? 'bg-red-600 animate-pulse' : 'bg-amber-500'
                }`}
              >
                {totalCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
