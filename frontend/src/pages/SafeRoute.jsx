import React, { useState, useEffect } from 'react';
import {
  Navigation,
  MapPin,
  Building2,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Milestone,
  CheckCircle2,
  Ban,
  ArrowRight,
  Car,
  Footprints,
  Truck,
} from 'lucide-react';
import { useSimulation } from '@/context/SimulationContext';
import { PRESET_LOCATIONS, calculateSafeRoute } from '@/services/routingService';
import { SHELTERS_DATA } from '@/data/shelters';
import FloodMap from '@/components/map/FloodMap';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import LoadingState from '@/components/common/LoadingState';
import { formatDistance, formatDuration } from '@/utils/formatters';

export const SafeRoute = () => {
  const { scenarioId, zones } = useSimulation();

  const [originIndex, setOriginIndex] = useState(0); // Deccan Gymkhana
  const [shelterIndex, setShelterIndex] = useState(0); // Balgandharva Hall
  const [travelMode, setTravelMode] = useState('driving');
  const [routeResult, setRouteResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const currentOrigin = PRESET_LOCATIONS[originIndex];
  const currentShelter = SHELTERS_DATA[shelterIndex];

  // Recalculate route when inputs or simulation scenario changes
  useEffect(() => {
    let isMounted = true;
    const fetchRoute = async () => {
      setIsCalculating(true);
      try {
        const result = await calculateSafeRoute({
          originCoords: currentOrigin.coordinates,
          destinationCoords: currentShelter.coordinates,
          mode: travelMode,
          scenarioId,
        });
        if (isMounted) {
          setRouteResult(result);
          setIsCalculating(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setIsCalculating(false);
      }
    };

    fetchRoute();
    return () => {
      isMounted = false;
    };
  }, [originIndex, shelterIndex, travelMode, scenarioId]);

  const isFlooded = scenarioId === 'FLOOD_RISK' || scenarioId === 'CRITICAL';

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              A* Inundation-Penalized Graph Routing
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
              HAZARD-EVADING PATHFINDER
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Flood-Aware Evacuation Navigation
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Dynamic pathfinding circumventing submerged causeways, low-lying subways, and flash flood corridors.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950 border border-slate-800 shrink-0">
          {[
            { key: 'driving', label: 'Driving', icon: Car },
            { key: 'walking', label: 'Walking', icon: Footprints },
            { key: 'emergency', label: 'Rescue Ambulance', icon: Truck },
          ].map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.key}
                onClick={() => setTravelMode(mode.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  travelMode === mode.key
                    ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/50 shadow-glow-blue'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Origin & Destination Configurator Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-400" />
            Current Starting Position / Citizen Location:
          </label>
          <select
            value={originIndex}
            onChange={(e) => setOriginIndex(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-medium focus:outline-none focus:border-cyan-500 transition-colors"
          >
            {PRESET_LOCATIONS.map((loc, idx) => (
              <option key={loc.id} value={idx}>
                {loc.name} ({loc.ward})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-blue-400" />
            Target Safe Evacuation Shelter:
          </label>
          <select
            value={shelterIndex}
            onChange={(e) => setShelterIndex(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-medium focus:outline-none focus:border-cyan-500 transition-colors"
          >
            {SHELTERS_DATA.map((sh, idx) => (
              <option key={sh.id} value={idx}>
                {sh.name} — {sh.capacity - sh.occupied} spots free ({sh.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content: Map & Navigation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Map Preview with Route Polylines */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 font-bold text-cyan-400">
                  <span className="w-3 h-1 bg-cyan-400 rounded"></span> Safe Path (Recommended)
                </span>
                {isFlooded && (
                  <span className="flex items-center gap-1.5 font-bold text-red-400">
                    <span className="w-3 h-1 bg-red-400 rounded border border-dashed"></span> Flooded Path (Avoided)
                  </span>
                )}
              </div>
              <span className="text-slate-400 text-[11px]">
                Centroid: {currentOrigin.ward}
              </span>
            </div>

            <FloodMap
              height="500px"
              center={currentOrigin.coordinates}
              zoom={14}
              zones={zones}
              shelters={SHELTERS_DATA}
              safeRoute={routeResult?.safeRoute}
              hazardousRoute={routeResult?.hazardousRoute}
              showControls={false}
              showLegend={false}
            />
          </div>
        </div>

        {/* Right: Path Metrics & Turn Instructions */}
        <div className="space-y-4">
          {isCalculating || !routeResult ? (
            <LoadingState message="Recalculating safe evacuation path..." />
          ) : (
            <>
              {/* Route Summary Card */}
              <div
                className={`p-5 rounded-2xl border backdrop-blur-md space-y-4 ${
                  routeResult.reroutedDueToHazard
                    ? 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border-amber-500/40 shadow-glow-moderate'
                    : 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border-emerald-500/30 shadow-glow-low'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Badge variant={routeResult.reroutedDueToHazard ? 'MODERATE' : 'LOW'}>
                    {routeResult.reroutedDueToHazard ? 'HAZARD REROUTE ACTIVE' : 'OPTIMAL CLEAR PATH'}
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono">
                    {formatDistance(routeResult.safeRoute.distanceMeters)}
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white font-mono">
                      {formatDuration(routeResult.safeRoute.durationSeconds)}
                    </span>
                    <span className="text-xs text-slate-400">estimated transit time</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    {routeResult.reroutedDueToHazard
                      ? 'Direct low-elevation causeways flooded. Automatically re-routed onto elevated arterial roads.'
                      : 'All arterial roads free of inundation. Direct shortest path recommended.'}
                  </p>
                </div>

                {/* Submerged Roads Alert Callout */}
                {routeResult.blockedRoads && routeResult.blockedRoads.length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-red-500/30 space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-red-400 uppercase text-[10px]">
                      <Ban className="w-3.5 h-3.5" /> Roads Cut-off by Inundation:
                    </div>
                    {routeResult.blockedRoads.map((br, i) => (
                      <div key={i} className="text-slate-300 flex justify-between text-[11px]">
                        <span>{br.roadName}</span>
                        <span className="text-red-400 font-mono font-bold">{br.waterDepthCm} cm deep</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Turn-by-Turn Navigation Card */}
              <Card
                title="Turn-by-Turn Guidance"
                subtitle="High-ground evacuation waypoints"
                icon={Milestone}
              >
                <div className="space-y-3">
                  {routeResult.safeRoute.segments.map((seg, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-xs"
                    >
                      <div className="w-6 h-6 rounded-full bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-[11px] font-mono">
                        {seg.step}
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <p className="text-white font-medium leading-snug">{seg.instruction}</p>
                        <div className="flex items-center gap-3 text-[10px] text-slate-400">
                          <span>{seg.distanceM} meters</span>
                          <span>•</span>
                          <span className="text-slate-300 font-medium">{seg.roadType}</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-semibold">{seg.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SafeRoute;
