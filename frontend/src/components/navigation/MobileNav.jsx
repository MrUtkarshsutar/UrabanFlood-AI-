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
  X,
} from 'lucide-react';
import { useAlerts } from '../../hooks/useAlerts';

export const MobileNav = ({ isOpen, onClose }) => {
  const { totalCount, criticalCount } = useAlerts();

  const links = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/map', label: 'Live Map', icon: Map },
    { to: '/nowcasting', label: 'Nowcasting', icon: TrendingUp },
    { to: '/alerts', label: 'Alerts', icon: AlertTriangle, count: totalCount },
    { to: '/safe-route', label: 'Safe Route', icon: Navigation },
    { to: '/shelters', label: 'Shelters', icon: Home },
    { to: '/incidents', label: 'Incident Reports', icon: FileWarning },
    { to: '/about', label: 'Architecture', icon: Info },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        >
          <div
            className="w-72 max-w-[80vw] h-full bg-slate-950 border-r border-slate-800 p-5 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
                  <span className="font-extrabold text-sm text-white">URBANFLOOD AI</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.to === '/'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                          isActive
                            ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
                            : 'text-slate-300 hover:bg-slate-900'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{link.label}</span>
                      </div>
                      {link.count !== undefined && link.count > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-600 text-white font-bold">
                          {link.count}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            <div className="text-[11px] text-slate-500 pt-4 border-t border-slate-800">
              SIH Disaster Response Platform
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 px-2 py-1.5 flex items-center justify-around">
        {[
          { to: '/', label: 'Dash', icon: LayoutDashboard },
          { to: '/map', label: 'Map', icon: Map },
          { to: '/nowcasting', label: 'Forecast', icon: TrendingUp },
          { to: '/alerts', label: 'Alerts', icon: AlertTriangle, badge: totalCount > 0 },
          { to: '/safe-route', label: 'Route', icon: Navigation },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors relative ${
                  isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              )}
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default MobileNav;
