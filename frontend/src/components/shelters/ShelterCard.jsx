import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Phone,
  User,
  Navigation,
  Check,
  ShieldAlert,
  MapPin,
  HeartPulse,
} from 'lucide-react';
import Badge from '../common/Badge';
import ShelterCapacityBar from './ShelterCapacityBar';
import { formatDistance } from '../../utils/formatters';

export const ShelterCard = ({ shelter }) => {
  const availableBeds = Math.max(0, shelter.capacity - shelter.occupied);

  return (
    <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 hover:border-slate-700/80 transition-all duration-200 flex flex-col justify-between gap-4">
      {/* Header: Name, Ward, Status */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <Badge variant={shelter.status} size="sm">
            {shelter.status}
          </Badge>
          <span className="text-xs text-slate-400 font-mono">
            {formatDistance(shelter.distanceM)} away
          </span>
        </div>

        <h3 className="text-base font-bold text-white tracking-tight leading-snug">
          {shelter.name}
        </h3>

        <p className="text-xs text-slate-400 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          {shelter.ward}
        </p>
      </div>

      {/* Capacity Progress Bar */}
      <ShelterCapacityBar occupied={shelter.occupied} capacity={shelter.capacity} />

      {/* Available Capacity Tag */}
      <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-400">Available Vacancy:</span>
        <span
          className={`font-mono font-bold ${
            availableBeds === 0 ? 'text-red-400' : availableBeds < 50 ? 'text-amber-400' : 'text-emerald-400'
          }`}
        >
          {availableBeds} beds remaining
        </span>
      </div>

      {/* Facilities & Amenities */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Emergency Amenities:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {shelter.amenities.map((am, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700/80"
            >
              {am}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Contact & Action Button */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
        <div className="text-[11px] text-slate-400">
          <div className="flex items-center gap-1 text-slate-300 font-medium">
            <User className="w-3 h-3 text-cyan-400" />
            <span className="truncate max-w-[120px]">{shelter.inCharge}</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] text-slate-400">
            <Phone className="w-2.5 h-2.5" />
            <span>{shelter.contact}</span>
          </div>
        </div>

        <Link
          to="/safe-route"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-glow-blue transition-colors shrink-0"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Route Here</span>
        </Link>
      </div>
    </div>
  );
};

export default ShelterCard;
