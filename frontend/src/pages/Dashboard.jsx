import React from 'react';
import { Link } from 'react-router-dom';
import {
  CloudRain,
  Waves,
  AlertTriangle,
  Home,
  ShieldCheck,
  TrendingUp,
  Map as MapIcon,
  ArrowRight,
  Radio,
} from 'lucide-react';
import { useFloodData } from '@/hooks/useFloodData';
import { useAlerts } from '@/hooks/useAlerts';
import { useShelters } from '@/hooks/useShelters';
import { useSimulation } from '@/context/SimulationContext';
import RiskOverview from '@/components/dashboard/RiskOverview';
import MetricCard from '@/components/dashboard/MetricCard';
import WaterLevelGauge from '@/components/dashboard/WaterLevelGauge';
import WeatherCard from '@/components/dashboard/WeatherCard';
import RecentAlertsList from '@/components/dashboard/RecentAlertsList';
import QuickRouteCard from '@/components/dashboard/QuickRouteCard';
import SystemStatusWidget from '@/components/dashboard/SystemStatusWidget';
import FloodMap from '@/components/map/FloodMap';
import LoadingState from '@/components/common/LoadingState';
import { SENSORS_DATA } from '@/data/sensors';
import { INITIAL_INCIDENTS } from '@/data/incidents';

export const Dashboard = () => {
  const { statusData, zones, isLoading, scenarioId } = useFloodData();
  const { alerts, criticalCount } = useAlerts();
  const { shelters, occupancyRate, availableBeds } = useShelters();

  if (isLoading || !statusData) {
    return <LoadingState message="Connecting to municipal flood telemetry network..." />;
  }

  return (
    <div className="space-y-6">
      {/* 1. Master Risk Overview Banner */}
      <RiskOverview statusData={statusData} scenarioId={scenarioId} />

      {/* 2. Key Telemetry Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Precipitation Intensity"
          value={statusData.rainfallMmHr}
          unit="mm/hr"
          subtitle={`24h Total: ${statusData.precipitation24h} mm`}
          icon={CloudRain}
          colorScheme={statusData.rainfallMmHr > 60 ? 'red' : statusData.rainfallMmHr > 35 ? 'amber' : 'cyan'}
          badgeText={statusData.rainfallMmHr > 60 ? 'Extreme' : statusData.rainfallMmHr > 35 ? 'Heavy' : 'Normal'}
        />

        <MetricCard
          title="River Stage (Bund Garden)"
          value={Number(statusData.waterLevelM).toFixed(2)}
          unit="meters"
          subtitle={`Danger Mark: ${statusData.dangerMarkM} m`}
          icon={Waves}
          colorScheme={statusData.waterLevelM >= statusData.dangerMarkM ? 'red' : statusData.waterLevelM >= 2.2 ? 'amber' : 'blue'}
          badgeText={statusData.waterLevelM >= statusData.dangerMarkM ? 'DANGER BREACHED' : 'Monitored'}
        />

        <MetricCard
          title="Early Warning Alerts"
          value={alerts.length}
          unit="active"
          subtitle={`${criticalCount} Critical warning broadcast`}
          icon={AlertTriangle}
          colorScheme={criticalCount > 0 ? 'red' : alerts.length > 0 ? 'amber' : 'emerald'}
          badgeText={criticalCount > 0 ? 'Action Mandatory' : 'Advisories'}
        />

        <MetricCard
          title="Emergency Shelters"
          value={availableBeds}
          unit="beds free"
          subtitle={`${occupancyRate}% Overall Occupancy`}
          icon={Home}
          colorScheme={availableBeds < 200 ? 'amber' : 'emerald'}
          badgeText={`${shelters.length} Facilities Active`}
        />
      </div>

      {/* 3. Middle Section: Hydrology Gauges & Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WaterLevelGauge
            currentLevel={statusData.waterLevelM}
            dangerMark={statusData.dangerMarkM}
            warningMark={2.20}
          />
        </div>
        <div>
          <WeatherCard />
        </div>
      </div>

      {/* 4. Live Map Preview Section */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <MapIcon className="w-5 h-5 text-cyan-400" />
              Live Geospatial Inundation Map
            </h3>
            <p className="text-xs text-slate-400">
              Interactive Pune Mula-Mutha Basin • Risk zones, sensors, and relief centers
            </p>
          </div>

          <Link
            to="/map"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700 transition-colors shrink-0"
          >
            <span>Full Tactical Map View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mini Embedded Map */}
        <FloodMap
          height="380px"
          zones={zones}
          shelters={shelters}
          sensors={SENSORS_DATA}
          incidents={INITIAL_INCIDENTS}
          showControls={false}
          showLegend={true}
        />
      </div>

      {/* 5. Bottom Grid: Alerts, Quick Route, System Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RecentAlertsList alerts={alerts} />
        <QuickRouteCard />
        <SystemStatusWidget />
      </div>
    </div>
  );
};

export default Dashboard;
