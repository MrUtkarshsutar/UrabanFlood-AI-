import React, { useState } from 'react';
import {
  Home,
  Search,
  Filter,
  Users,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  HeartPulse,
} from 'lucide-react';
import { useShelters } from '@/hooks/useShelters';
import ShelterCard from '@/components/shelters/ShelterCard';
import LoadingState from '@/components/common/LoadingState';

export const Shelters = () => {
  const { shelters, isLoading, totalCapacity, totalOccupied, availableBeds, occupancyRate } =
    useShelters();

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return <LoadingState message="Loading disaster relief shelter registry..." />;
  }

  const filteredShelters = shelters.filter((sh) => {
    if (statusFilter !== 'ALL' && sh.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = sh.name.toLowerCase().includes(q);
      const matchWard = sh.ward.toLowerCase().includes(q);
      return matchName || matchWard;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Disaster Relief Infrastructure
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/20 text-blue-300 font-mono border border-blue-500/30">
              PMC RELIEF CORPS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Emergency Shelters & Relief Camps
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Safe designated assembly buildings with independent emergency power, water filtration, and medical triage.
          </p>
        </div>

        {/* Global Capacity Gauge */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4 shrink-0 text-xs">
          <div>
            <span className="text-slate-500 uppercase text-[10px] font-semibold">Total City Capacity</span>
            <p className="text-base font-black text-white font-mono mt-0.5">
              {totalCapacity.toLocaleString()} beds
            </p>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div>
            <span className="text-slate-500 uppercase text-[10px] font-semibold">Available Spots</span>
            <p className="text-base font-black text-emerald-400 font-mono mt-0.5">
              {availableBeds.toLocaleString()} free
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search shelters by name, ward, or landmark..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'AVAILABLE', 'LIMITED', 'FULL'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                statusFilter === st
                  ? 'bg-cyan-600/20 text-cyan-300 border-cyan-500 shadow-glow-blue'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Shelter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredShelters.map((shelter) => (
          <ShelterCard key={shelter.id} shelter={shelter} />
        ))}
      </div>
    </div>
  );
};

export default Shelters;
